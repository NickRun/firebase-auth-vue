import store from '../store'
import firebase from 'firebase'
import firebasePopulateUserDocsMeta from './populateUserDocsMeta'

var firebaseLoginStatus = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.state.auth.signedIn = true
      store.state.auth.email = user.email
      store.state.auth.uid = user.uid
      firebasePopulateUserDocsMeta()
    } else {
      store.state.auth.signedIn = false
    }
  })
}

export default firebaseLoginStatus
