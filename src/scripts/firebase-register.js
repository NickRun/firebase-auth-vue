import store from '../store'
import firebase from 'firebase'

var firebaseRegister = function (email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      // Change global state
      store.state.auth.signedIn = true
      store.state.auth.uid = user.uid
    })
    .catch(error => {
      // Handle Errors here.
      store.state.auth.errorCode = error.code
    })
}

export default firebaseRegister
