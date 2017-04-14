<template lang="jade">
div.code-editor-sidebar
  ul.nav
    li.nav-item(v-for="(docMeta, docId) in sharedState.userDocsMeta")
      span.nav-link(@click="updateCurrentDoc(docId, docMeta.name)") {{docMeta.name}}
</template>

<script>
import store from '../store'
import changeCurrentDoc from '../scripts/changeCurrentDoc'

export default {
  data () {
    return {
      sharedState: store.state
    }
  },
  methods: {
    updateCurrentDoc: function (id, name) {
      changeCurrentDoc(id, name)
    }
  }
}
</script>

<style lang="scss">
.code-editor-sidebar {
  height:100%;
  width:200px;
  position:absolute;
  top:0;
  left:0;
}
span.nav-link {
  cursor:pointer;
}
</style>
