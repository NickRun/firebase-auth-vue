import firebase from 'firebase'
import store from '../store.js'
import updateCurrentDoc from './updateCurrentDoc'
import publishDoc from './publishDoc'

var saveDoc = function () {
  const content = store.state.cm.doc.getValue()
  const name = store.state.currentDoc.name
  const mode = 'modeee'
  const userId = store.state.auth.uid
  const docMeta = {
    mode: mode,
    name: name
  }
  const updates = {}
  var key = ''
  const currentDocId = store.state.currentDoc.id

  if (currentDocId !== undefined) { // doc exists in database (has a key)
    key = currentDocId
  } else { // doc does not exist in database
    key = firebase.database().ref('users/' + userId + 'docs/content/').push().key
    updateCurrentDoc(key, name)
  }

  updates['docs/content/' + key] = content
  updates['docs/meta/' + key] = docMeta

  firebase.database().ref('users/' + userId).update(updates)

  return publishDoc(content, userId, key)
}

export default saveDoc
