<template lang="jade">
nav.navbar.navbar-light.bg-faded
  ul.nav.float-xs-left
    li.nav-item.dropdown(v-bind:class="{'open': fileDropdownBlock}")
      span.nav-link.dropdown-toggle(data-toggle="dropdown", aria-haspopup="true",
        data-nofire, @click="showFileDropdown") File
      div.dropdown-menu
        span.dropdown-item(@click="saveFile") Save File
  ul.nav.navbar-nav.float-xs-right
    li.nav-item(v-if="!sharedState.auth.signedIn")
      button.btn.btn-outline-primary(
        @click="signin") Sign In
    li.nav-item(v-if="!sharedState.auth.signedIn")
      button.btn.btn-outline-primary(
        @click="signup") Create Account
    li.nav-item(v-if="sharedState.auth.signedIn")
      button.btn.btn-outline-primary(
        @click="signout") Sign out
</template>

<script>
import store from '../store'
import firebaseLogout from '../scripts/firebase-logout'
import saveDoc from '../scripts/saveDoc'

export default {
  data () {
    return {
      sharedState: store.state,
      fileDropdownBlock: false
    }
  },
  methods: {
    signout: function () {
      firebaseLogout()
    },
    signup: function () {
      this.$router.push({ path: 'register' })
    },
    signin: function () {
      this.$router.push({ path: 'signin' })
    },
    showFileDropdown: function () {
      this.fileDropdownBlock = this.fileDropdownBlock === false
    },
    hideFileDropdownListener: function (e) {
      // Click on anywhere but elements with "data-nofire" and toggle dropdown
      if (!e.target.hasAttribute('data-nofire')) this.showFileDropdown()
    },
    saveFile: function () {
      saveDoc()
    }
  },
  watch: {
    'sharedState.auth.signedIn': function () {
      if (this.sharedState.auth.signedIn !== true) {
        this.$router.push({ path: 'signed-out' })
      }
    },
    'fileDropdownBlock': function () {
      if (this.fileDropdownBlock) {
        document.body.addEventListener('click', this.hideFileDropdownListener)
      } else {
        document.body.removeEventListener('click', this.hideFileDropdownListener)
      }
    }
  }
}
</script>

<style lang="scss">
span.nav-link, span.dropdown-item {
  cursor:pointer;
  user-select: none;
}
</style>
