<template lang="jade">
div.code-editor-wrapper
  EditorSidebar
  EditorTools
  textarea#code-editor
</template>

<script>
import store from '../store'
import CodeMirror from 'codemirror'
import EditorSidebar from './EditorSidebar'
import EditorTools from './EditorTools'

export default {
  components: {
    EditorSidebar, EditorTools
  },
  data () {
    return {
      sharedState: store.state
    }
  },
  mounted: function () {
    this.sharedState.cm = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
      lineNumbers: true,
      mode: 'htmlmixed',
      viewportMargin: Infinity
    })
  }
}
</script>

<style lang="scss">
@import '../../node_modules/codemirror/lib/codemirror.css';
.code-editor-wrapper {
  height:100%;
  position:relative;
  padding-left:200px;
}
.CodeMirror {
  height:100%;
}
</style>
