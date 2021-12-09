import Rebase from 're-base'
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD_dh3XPUvDdjD23XjMSRAlhYPk5dOFQVs",
    authDomain: "hot-burgers-6d1b0.firebaseapp.com",
    databaseURL: "https://hot-burgers-6d1b0-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;
