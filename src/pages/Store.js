// this is the main file of the app, it will have all the state for all the other pieces of the project

import React from 'react';

import Loading from '../components/basic/Loading';
import Header from '../components/Header';
import ListOfFishes from '../components/ListOfFishes';
import Dashboard from '../components/Dashboard';
import NotFound from './NotFound';

import base from '../assets/js/firebase';
import firebase from 'firebase';

import sampleFishes from '../assets/js/sample-fishes';

class Store extends React.Component{

	state = {
		loading: true,
		fishes: {},
		wishlist: {},
		isStoreReal: false,
		isDashboard: false
	};

	// sync the state of fishes as soon as App mounts using the store name as the first param on the database
    componentWillMount() {
		const currentStore = this.props.match.params.storeId;
		this.props.updateCurrentStoreOnRouter(currentStore);
		
        this.ref = base.syncState(`stores/${currentStore}/fishes`, {
			context: this,
			state: 'fishes',
			then() {
				this.loadFishes();
				this.checkStore();
			}
		});

		const wishlistLocal = localStorage.getItem(currentStore);
        // if there is a localStorage, set the state of order to the one on the localStorage
        // parsing the string of the object, to an object again
        if(wishlistLocal){
            this.setState({ wishlist: JSON.parse(wishlistLocal)});
        };

	}

	// everytime we load the page, firebase will se if we're logged in and authenticated
    // if it's true, it will bring the user, do all the checks and log in if everything's right
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
            if ( !this.isOpenStore(this.props.storeId) ){
                if(user) {
                    this.props.authHandler({ user });
                    this.props.authHandlerCheckUser({ user });
                }
            }
        });
	}

	componentDidUpdate() {
        // adding item of name 'store name' and value of 'order' object
        // transforming the object into a string, as the localStorage doesn't accept object as value
        localStorage.setItem( this.props.match.params.storeId, JSON.stringify(this.state.wishlist) );
    }

	checkStore = () => {
		const currentStore = this.props.match.params.storeId;

		this.ref = base.fetch(`stores/${currentStore}`, {
			context: this,
			then(store){
				if (!store.name && this.props.currentStore){
					base.post(`stores/${currentStore}/name`, {
						data:  this.props.currentStore
					});
					this.setState({ currentStore: this.props.currentStore, isStoreReal: true }, () => {
					});
					
				} else if (store.name){
					this.setState({ currentStore: store.name, isStoreReal: true }, () => {
					});
					
				} else {
					// this.renderNotFound();
					this.setState({ currentStore: store.name, isStoreReal: false });
				}
				this.setState({ loading: false })
			}
		});
	}

	deleteStore = async () => {
		let storeToDelete = this.props.storeId ? this.props.storeId : this.state.currentStoreURL
        base.remove(`stores/${storeToDelete}`)
        .then(() => {
            this.props.history.push('/');
        })
        .catch(error => {
            //handle error
        });
	}
	
	showDashboard = () => {
        this.state.isDashboard ? this.setState({isDashboard: false}) : this.setState({isDashboard: true});
	}

	isOpenStore = store => {
        return this.props.openStores.includes(store)
    }
	
	renderStore = () => {
		return (
			<React.Fragment key="1">
				{/* Conditional Operator -> if is still loading, show nothing */}
				{
					this.state.isStoreReal
					?
					<React.Fragment key="1">
						<Header
							isOpenStore={ this.isOpenStore }
							logout={ this.props.logout }
							pageName={ this.state.currentStore }
							wishlist={ this.state.wishlist }
							fishes={ this.state.fishes }
							moreFish={ this.moreFish }
							lessFish={ this.lessFish }
							history={ this.props.history }
							user={ this.props.user }
							authenticate={ this.props.authenticate }
						/>
						<div className="container-fluid content-wrapper">
							<div className="row">
								<div className="col-11 col-lg-9 col-xl-7 mx-auto">
									{ this.isOpenStore(this.props.storeId) || (this.props.userUid && (this.props.userUid === this.props.storeOwner))
									?
										<button
											className="switch-board"
											onClick={ this.showDashboard }
										>
											{ this.state.isDashboard
											?
												'Show Store'
											:
												'Show Inventory'
											}
										</button>
									:
										null
									}
									<div className="board-holder">
										{ this.state.isDashboard
										?
											<Dashboard
												isOpenStore={ this.isOpenStore }
												openStores={ this.props.openStores }
												fishes={ this.state.fishes }
												resetFishes={ this.resetFishes }
												editFish={ this.editFish }
												storeId={ this.props.storeId }
												authenticate={ this.props.authenticate }
												storeOwner={ this.props.storeOwner }
												userUid={ this.props.userUid }
												deleteStore={ this.deleteStore }
											/>
										:
										<ListOfFishes
											items={ this.state.fishes }
											addItem={ this.addFish }
											/>
										}
									</div>
								</div>
							</div>
						</div>

					</React.Fragment>
					:
					<NotFound/>
				}
			</React.Fragment>
		);
	}

	loadFishes = () => {
		if(Object.keys(this.state.fishes).length === 0){
			this.setState({fishes: sampleFishes});
		}
	}

	resetFishes = () => {
		base.remove(`stores/${this.props.storeId}/fishes`)
        .then(() => {
			this.setState({fishes: sampleFishes});
		})
	}

	addFish = (fishIndex) => {
		const wishlistState = {...this.state.wishlist};
		if ( !wishlistState.hasOwnProperty(fishIndex) ) {
			wishlistState[fishIndex] = 1;
			this.setState({ wishlist: wishlistState });
		}
	};

	moreFish = (fishIndex) => {
		const wishlistState = {...this.state.wishlist};
		wishlistState[fishIndex] += 1;
		this.setState({ wishlist: wishlistState });
	};

	lessFish = (fishIndex) => {
		const wishlistState = {...this.state.wishlist};
		if ( wishlistState[fishIndex] === 1 ) {
			delete wishlistState[fishIndex];
		} else {
		wishlistState[fishIndex] -= 1;
		}
		this.setState({ wishlist: wishlistState });
	};

	editFish = (whatToChange, valueToChangeTo, whatFishToChange) => {
		const fishesState = {...this.state.fishes};
		const fishToChange = fishesState[whatFishToChange];
		console.log(fishToChange)
		fishToChange[whatToChange] = valueToChangeTo;
        this.setState({	fishes: fishesState});
    }

	render(){
		//create an array so I can call a function on return
        const oneArray = ['1'];
        return(
            <React.Fragment>
				{
					this.state.loading
					?
					<Loading/>
					:
                	oneArray.map(this.renderStore)
				}
            </React.Fragment>
        )
		
	};
};

export default Store;