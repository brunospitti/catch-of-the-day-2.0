import React from 'react';

import stores from '../assets/js/stores';

import firebase from 'firebase';
import base from '../assets/js/firebase';

import Loading from '../components/basic/Loading';
import Header from '../components/Header';
import Dropdown from '../components/basic/Dropdown';


class StorePicker extends React.Component {
    state = {
        loading: true,
        currentStore: '',
        currentStoreInput: '',
        allStores: {},
        allStoresNames: []
    }
    
    selectedStoreInput = React.createRef();
    selectedStore = React.createRef();

    // everytime we load the page, firebase will se if we're logged in and authenticated
    // if it's true, it will bring the user, do all the checks and log in if everything's right
    componentDidMount() {

        base.fetch(`stores`, {
            context: this,
            then(storesAlreadyOnFirebase){

                stores.map(storename => {
                    const storeUrlName = storename.replace(/[\W_]/g, "-").toLowerCase();
                    if(!storesAlreadyOnFirebase.hasOwnProperty(storeUrlName)){
                        base.post( `stores/${storeUrlName}`, {
                            data:   {
                                        name: storename
                                    }
                        })
                    }
                })

                Object.keys(storesAlreadyOnFirebase).map(storeOnFirebase => {
                    let allStoresNamesState = {...this.state.allStoresNames};
                    allStoresNamesState[storeOnFirebase] = {
                        name: storesAlreadyOnFirebase[storeOnFirebase].name,
                        owner: storesAlreadyOnFirebase[storeOnFirebase].owner
                    }
                    this.setState({ allStoresNames: allStoresNamesState})
                })


            }
        })
        
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.authHandler({ user }).then(() => {
                    this.setState({ loading: false })
                });
            } else {
                this.setState({ loading: false })
            }
        });

    };

    renderStorePicker = () => {
        return(
            <React.Fragment key="1">
                <div className="col col-lg-9">
                    <div className="form-holder">
                        <Dropdown 
                            stores={ this.state.allStoresNames }
                            submitStore={ this.submitStore }
                            userUid={ this.props.user.uid }
                        />
                        { this.props.user.uid
                        ?
                            <div className="create-store-holder">
                                <h5>or create your own</h5>
                                <form className="input-holder">
                                    <input
                                        type="text"
                                        className="addStore"
                                        placeholder="Type new store name"
                                        onChange={this.selectStoreInput}
                                        ref={this.selectedStoreInput}
                                    />
                                    <button className="submit-store" onClick={() => { this.submitStore(this.selectedStoreInput.value.value) } }>select this store</button>
                                </form>
                            </div>
                        :
                            null
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }

    selectStoreInput = () => {
        this.setState({currentStoreInput: this.selectedStoreInput.value.value});
    }
    
    submitStore = storeToSubmit => {
        this.setState({currentStore: storeToSubmit},() => {
            if(this.state.currentStoreInput !== ""){
                const allStores = [...this.state.allStoresNames];
                allStores.push(this.state.currentStoreInput);
                const storeUrlName = this.state.currentStoreInput.replace(/[\W_]/g, "-").toLowerCase();
                if(!this.state.allStoresNames.hasOwnProperty(this.state.currentStoreInput)){
                    this.props.addStoreToFirebase(this.state.currentStoreInput, storeUrlName);
                    this.props.history.push(`/store/${storeUrlName}`);
                } else {
                    alert('Store already exists')
                }
            } else if (this.state.currentStore === ""){
                alert(" select a store");
            } else {
                const storeUrlName = this.state.currentStore.replace(/[\W_]/g, "-").toLowerCase();
                this.props.addStoreToFirebase(this.state.currentStore, storeUrlName);
                this.props.history.push(`/store/${storeUrlName}`);
            }
        });
    }

    render(){
        //create an array so I can call a function on return
        const oneArray = ['1'];

        return(
            <div className="container-fluid p-0">
                <Header
                    pageName={ 'Select a store...' }
                    user={ this.props.user }
                    authenticate={ this.props.authenticate }
                    logout={ this.props.logout }
                />
                <div className="container">
                    <div className="row justify-content-md-center store-picker-wrapper">
                    {
                        this.state.loading
                        ? (
                            <Loading/>
                        )
                        : (
                            <React.Fragment>
                                
                                { oneArray.map(this.renderStorePicker) }

                            </React.Fragment>
                        )
                    }
                    </div>
                </div>
            </div>
        )
    };
};

export default StorePicker;