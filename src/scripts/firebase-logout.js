import store from '../store'
import firebase from 'firebase'

var firebaseLogout = function () {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    // Change state
    store.state.auth.signedIn = false
  }, error => {
    // An error happened.
    console.log('signout error: ' + error)
  })
}

export default firebaseLogout
