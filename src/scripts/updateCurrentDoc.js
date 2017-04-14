import store from '../store.js'

var updateCurrentDoc = function (docId, docName) {
  store.state.currentDoc.name = docName
  store.state.currentDoc.id = docId
}

export default updateCurrentDoc
