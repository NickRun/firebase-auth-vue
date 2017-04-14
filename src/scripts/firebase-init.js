// Firebase
import firebase from 'firebase'
import firebaseLoginStatus from './firebase-loginstatus.js'

var fbInit = function () {
  var config = {
    apiKey: 'xxx',
    authDomain: 'xxx',
    databaseURL: 'xxx',
    storageBucket: 'xxx',
    messagingSenderId: 'xxx'
  }
  firebase.initializeApp(config)
  firebaseLoginStatus()
}

export default fbInit
