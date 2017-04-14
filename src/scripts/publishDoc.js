// import firebase from 'firebase'
import Vue from 'vue'
import VueResource from 'vue-router'
import bitballoon from 'bitballoon'

Vue.use(VueResource)

// https://github.com/BitBalloon/bitballoon-api

var bitballoonPublish = function () {
  // https://www.bitballoon.com/api/v1/sites?access_token=
  var client = bitballoon.createClient({client_id: '7c5d0b97ea3b98ed0e858be3b58eeea7d460e74a967290324a32ba13397a6d2a', client_secret: 'a1965e6a000e9bda9936b630951206ee3ac35a9cfda12e8ff997b9ac89b02883'})
  client.authorizeFromCredentials(function (err, accessToken) {
    if (err) return console.log(err)
    if (accessToken) return console.log(accessToken)
  })
}

// var makeShortUrl = function (longUrl, userId, docId) {
//   const shortUrlRef = firebase.database().ref('users/' + userId + '/docs/meta/' + docId)
//   Vue.http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAAjeefR2zjEuTU_E0t9HsieMfOcKFiIZE',
//     {'longUrl': longUrl})
//     .then(function (response) {
//       console.log('yes')
//       const shortUrl = response.body.id
//       shortUrlRef.update({ shortUrl: shortUrl })
//       console.log(response)
//     }, function (response) {
//       console.log('no')
//       console.log(response)
//     })
// }

// var publishDoc = function (content, userId, docId) {
//   /*eslint-disable */
//   var docBlob = new Blob([content], { type: 'text/html' })
//   /*eslint-enable */
//   const storageRef = firebase.storage().ref()
//   var docRef = storageRef.child('users/' + userId + '/docs/' + docId + '.html')
//   docRef.put(docBlob).then(function (snapshot) {
//     makeShortUrl(snapshot.a.downloadURLs[0], userId, docId)
//   })
// }

export default bitballoonPublish
