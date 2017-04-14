import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Site from './components/Site.vue'
import Auth from './components/Auth.vue'
import Editor from './components/Editor.vue'
import fbInit from './scripts/firebase-init.js'

Vue.use(VueRouter)
Vue.use(VueResource)

fbInit()

var router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', component: Editor, name: 'editor' },
    { path: '/signin', component: Auth, name: 'signin' },
    { path: '/signed-out', component: Auth, name: 'signedOut' },
    { path: '/register', component: Auth, name: 'register' },
    { path: '/reset-password', component: Auth, name: 'resetPassword' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<Site/>',
  components: { Site }
})
