import firebase from 'firebase'
import store from '../store.js'
import updateCurrentDoc from './updateCurrentDoc'

var firebaseListUserDocNames = function (docId, docName) {
  const userId = store.state.auth.uid
  firebase.database().ref('users/' + userId + '/docs/content/' + docId).once('value').then(function (snapshot) {
    store.state.cm.doc.setValue(snapshot.val())
    updateCurrentDoc(docId, docName)
  })
}

export default firebaseListUserDocNames
