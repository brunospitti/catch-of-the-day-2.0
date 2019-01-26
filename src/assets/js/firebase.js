// React - firebase
import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB5Lqb-ELB8j8RXSsTrsvzqGSuzseyPy38",
    authDomain: "catch-of-the-day-from-scratch.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-from-scratch.firebaseio.com",
    projectId: "catch-of-the-day-from-scratch",
    storageBucket: "catch-of-the-day-from-scratch.appspot.com",
    messagingSenderId: "926370903287"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;