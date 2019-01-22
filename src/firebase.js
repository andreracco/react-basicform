import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyARn54rbQ76DS60gAGGc35PimIXcSwEV4o",
    authDomain: "forms-test-a469d.firebaseapp.com",
    databaseURL: "https://forms-test-a469d.firebaseio.com",
    projectId: "forms-test-a469d",
    storageBucket: "forms-test-a469d.appspot.com",
    messagingSenderId: "844334646418"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    firebaseDB, 
    googleAuth
}