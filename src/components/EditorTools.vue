<template lang="jade">
div.container-fluid
  div.row
    div.col-xs-6
      div.input-group
        div.input-group-addon Name
        input.form-control(type="text", placeholder="Document name", v-model="sharedState.currentDoc.name")
    div.col-xs-6
      button.btn.btn-secondary(
        type="button",
        @click="saveDoc()") Save
</template>

<script>
import store from '../store'
import saveDoc from '../scripts/saveDoc'

export default {
  data () {
    return {
      sharedState: store.state
    }
  },
  methods: {
    saveDoc: function () {
      saveDoc()
    }
  }
}
</script>

<style lang="scss">
</style>
