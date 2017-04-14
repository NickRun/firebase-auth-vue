<template lang="jade">
div#site-wrapper
  site-header
  div#site-content
    router-view
</template>

<script>
// Components
import SiteHeader from './SiteHeader.vue'
// Global Store
import store from '../store'

export default {
  components: {
    SiteHeader
  },
  data () {
    return {
      sharedState: store.state
    }
  }
}
</script>

<style lang="scss">
@import "../../node_modules/bootstrap/scss/bootstrap";

html,body, #site-wrapper, #site-content {
  height:100%;
}

#site-content {
  margin-top:-54px;
  padding-top:54px;
}

.btn:focus {
  outline: none;
}
</style>
