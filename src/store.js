var store = {
  state: {
    auth: {
      errorCode: '',
      passwordResetSuccess: false,
      signedIn: false,
      email: '',
      uid: ''
    },
    cm: {},
    currentDoc: {
      name: 'Untitled'
    },
    userDocsMeta: {}
  }
}

export default store
