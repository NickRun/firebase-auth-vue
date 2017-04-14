import store from '../store.js'
import firebase from 'firebase'
import firebaseLoginStatus from './firebase-loginstatus.js'

var firebaseLogin = function (email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      // Handle Errors here.
      store.state.auth.errorCode = error.code
    })
  firebaseLoginStatus()
}
export default firebaseLogin
