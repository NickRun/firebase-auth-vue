<template lang="jade">
div#app-authentication.container-fluid
  div.user-auth
    div.alert.alert-success(
      v-if="successMessage") {{ successMessage }}
    div.alert.alert-danger(
    v-if="errorMessage") {{ errorMessage }}
    div.card
      h3.card-header
        template(v-if="$route.name === 'register'") Register
        template(v-if="$route.name === 'signin' || $route.name === 'signedOut'") Sign In
        template(v-if="$route.name === 'resetPassword'") Reset Password
      div.card-block
        form
          div.form-group(v-bind:class="{'has-danger': emailFieldError}")
            label(
              class="form-control-label",
              for="signinEmail") Email Address
            input#signinEmail.form-control(
              type="email",
              placeholder="Enter Email",
              v-model="email")
          div.form-group(
            v-bind:class="{'has-danger': passwordFieldError}",
            v-if="$route.name !== 'resetPassword'")
            label(
              class="form-control-label",
              for="signinPassword") Password
            input#signinPassword.form-control(
              type="password",
              placeholder="Enter Password",
              v-model="password")
          button.btn.btn-primary(
            type="submit",
            @click="register($event)",
            v-if="$route.name === 'register'") Create account
          button.btn.btn-primary(
            type="submit",
            @click="login($event)",
            v-if="$route.name === 'signin' || $route.name === 'signedOut'") Sign into account
          button.btn.btn-primary(
            type="submit",
            @click="reset($event)",
            v-if="$route.name === 'resetPassword'") Email me a link to reset
    div.card-block
      template(v-if="$route.name === 'signin' || $route.name === 'signedOut'")
        p Need an account? #[router-link(to="register") Create account]
        p Forgot your password? #[router-link(to="reset-password") Reset password]
      template(v-if="$route.name === 'register'")
        p Already have an account? #[router-link(to="signin") Sign in]
</template>

<script>
import store from '../store'
import firebaseRegister from '../scripts/firebase-register.js'
import firebaseLogin from '../scripts/firebase-login.js'
import firebaseResetPassword from '../scripts/firebase-resetPassword'

export default {
  data () {
    return {
      sharedState: store.state,
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      emailFieldError: false,
      passwordFieldError: false
    }
  },
  methods: {
    register: function (event) {
      if (event) event.preventDefault() // Prevent page from refreshing
      firebaseRegister(this.email, this.password)
    },
    login: function (event) {
      if (event) event.preventDefault() // Prevent page from refreshing
      firebaseLogin(this.email, this.password)
    },
    reset: function (event) {
      if (event) event.preventDefault() // Prevent page from refreshing
      firebaseResetPassword(this.email)
    },
    clearMessages: function () {
      this.errorMessage = ''
      this.successMessage = ''
      this.emailFieldError = ''
      this.passwordFieldError = ''
    },
    clearEmailInput: function () {
      this.email = ''
    },
    clearPasswordInput: function () {
      this.password = ''
    }
  },
  watch: {
    'sharedState.auth.signedIn': function () {
      const signedIn = this.sharedState.auth.signedIn
      if (signedIn) {
        this.$router.push({ path: '/' })
      }
    },
    'sharedState.auth.passwordResetSuccess': function () {
      this.clearMessages()
      if (this.sharedState.auth.passwordResetSuccess === true) {
        this.successMessage = 'An email has been sent to you with a link to reset your password.'
      }
    },
    'sharedState.auth.errorCode': function () {
      this.clearMessages()
      const errorCode = this.sharedState.auth.errorCode
      console.log(errorCode)
      if (errorCode === 'auth/wrong-password') {
        this.errorMessage = 'Incorrect Password'
        this.passwordFieldError = true
        this.clearPasswordInput()
      } else if (errorCode === 'auth/user-not-found') {
        this.errorMessage = 'Cannot find user email.'
        this.emailFieldError = true
      } else if (errorCode === 'auth/email-already-in-use') {
        this.errorMessage = 'Email already in use.'
        this.emailFieldError = true
      } else if (errorCode === 'auth/weak-password') {
        this.errorMessage = 'Password needs atleast 6 characters.'
        this.passwordFieldError = true
        this.clearPasswordInput()
      } else if (errorCode === 'auth/invalid-email') {
        this.errorMessage = 'Invalid email.'
        this.emailFieldError = true
      } else if (!errorCode) {
        this.errorMessage = ''
      } else {
        this.errorMessage = 'An error has occured.'
      }
    },
    '$route.name': function () {
      this.clearMessages()
      this.clearEmailInput()
      this.clearPasswordInput()
    }
  },
  created: function () {
    this.clearMessages()
    this.clearEmailInput()
    this.clearPasswordInput()
    if (this.$route.name === 'signedOut') {
      this.successMessage = 'You are signed out.'
    }
  }
}
</script>

<style lang="scss">
#app-authentication {
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-auth {
  width : 420px;
  max-width:100%;
  position  : relative;
}
</style>
