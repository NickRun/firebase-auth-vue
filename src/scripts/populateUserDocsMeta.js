import firebase from 'firebase'
import store from '../store.js'

var listUserDocNames = function () {
  const userId = store.state.auth.uid
  return firebase.database().ref('users/' + userId + '/docs/meta').on('value', function (snapshot) {
    store.state.userDocsMeta = snapshot.val()
  })
}

export default listUserDocNames
