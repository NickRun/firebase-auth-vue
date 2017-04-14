import store from '../store.js'
import firebase from 'firebase'

var firebaseResetPassword = function (emailAddress) {
  firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
    // Email sent.
    store.state.auth.passwordResetSuccess = true
  }, error => {
    store.state.auth.passwordResetSuccess = false
    store.state.auth.errorCode = error.code
  })
}

export default firebaseResetPassword
