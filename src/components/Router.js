import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import StorePicker from '../pages/StorePicker';
import Store from '../pages/Store';
import NotFound from '../pages/NotFound';

import firebase from 'firebase';
import base, { firebaseApp } from '../assets/js/firebase';

class Router extends React.Component {

    state = {
        stores: [],
        storesURL: [],
        openStores: ["fish-mania","reactive-fish","somethin--fishy"],
        user: {},
        currentStoreURL: '',
        storeOwner: ''
    }

    authenticateStorePicker = provider => {
        // normally it would be like new firebase.auth.FacebookAuthProvider()
        // but as it's a variable, this method below is used
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandlerStorePicker)
    };

    authHandlerStorePicker = async (authData) => {
        const users = await base.fetch(`users`, { context: this });
        const usersAmount = Object.keys(users).length;
        
        if( (Object.keys(users).find(key => users[key].uid === authData.user.uid) !== undefined) ){
            Object.keys(users).map(key => {
                if(users[key].uid === authData.user.uid){
                    base.syncState(`users/${[key]}`, {
                        context: this,
                        state: 'user'
                    })
                }
            })
        }

        if (usersAmount === 0 || (Object.keys(users).find(key => users[key].uid === authData.user.uid) === undefined)) {
            await base.post( `users/user${usersAmount}`, {
                data:   {
                            uid: authData.user.uid,
                            email: authData.user.providerData[0].email,
                            name: authData.user.providerData[0].displayName,
                            picture: authData.user.providerData[0].photoURL
                        }
            });
            base.syncState(`users/user${usersAmount}`, {
                context: this,
                state: 'user'
            });
        }

    };

    authenticateDashboard = provider => {
        // normally it would be like new firebase.auth.FacebookAuthProvider()
        // but as it's a variable, this method below is used
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandlerDashboard)
    };

    authHandlerDashboard = async (authData) => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(`stores/${this.state.currentStoreURL}`, { context: this });

        if(this.state.storesURL.indexOf(this.state.currentStoreURL) <= -1){
            if (!store.owner) {
                await base.post( `stores/${this.state.currentStoreURL}/owner`, {
                    data: authData.user.uid
                }).then(() => {
                    this.setState({
                        storeOwner: authData.user.uid
                    })
                })
            } else {
                this.setState({
                    storeOwner: store.owner
                })
            }
        }
    };

    addStoreToFirebase = (currentStore, currentStoreURL) => {
        this.setState({currentStore: currentStore, currentStoreURL: currentStoreURL });
    }

    updateCurrentStoreOnRouter = (currentStoreURL) => {
        this.setState({currentStoreURL: currentStoreURL });
    }

    updateStores = (stores, currentStore, currentStoreURL) => {
        const storesReplaced = stores.map(store => store.replace(/[\W_]/g, "-").toLowerCase());
        if(storesReplaced.includes(currentStoreURL)){
            this.setState({ stores: stores, currentStore: currentStore, storesURL: storesReplaced, currentStoreURL: currentStoreURL });
        }
    }

    logout = async () => {
        await firebase.auth().signOut();
        let currentuser = {...this.state.user};
        currentuser = {};
        this.setState({ user: currentuser },() =>{});
    };

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) =>
                        <StorePicker
                            {...props}
                            openStores={ this.state.openStores }
                            authHandler={ this.authHandlerStorePicker }
                            authenticate={ this.authenticateStorePicker }
                            logout={ this.logout }
                            user={ this.state.user }
                            addStoreToFirebase={ this.addStoreToFirebase }
                        />
                    }/>
                    <Route exact path="/store/:storeId" render={(props)=>
                        <Store
                            {...props}
                            openStores={ this.state.openStores }
                            currentStore={ this.state.currentStore }
                            stores={ this.state.stores }
                            storesURL={ this.state.storesURL }
                            storeId={ this.state.currentStoreURL }
                            authHandlerCheckUser={ this.authHandlerStorePicker }
                            authHandler={ this.authHandlerDashboard }
                            authenticate={ this.authenticateDashboard }
                            logout={ this.logout }
                            storeOwner={ this.state.storeOwner }
                            userUid={ this.state.user.uid }
                            user={ this.state.user }
                            updateCurrentStoreOnRouter={ this.updateCurrentStoreOnRouter }
                        />
                    }/>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;