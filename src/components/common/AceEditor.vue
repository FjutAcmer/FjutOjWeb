<template>
  <div class="ace-container">
    <div
      class="ace-editor"
      ref="ace"
    ></div>

  </div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/text'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'

const modeArray = [{
  name: 'JavaScript',
  path: 'ace/mode/javascript'
}, {
  name: 'HTML',
  path: 'ace/mode/html'
}, {
  name: 'CSS',
  path: 'ace/mode/css'
}, {
  name: 'SCSS',
  path: 'ace/mode/scss'
}, {
  name: 'Json',
  path: 'ace/mode/json'
}, {
  name: 'Java',
  path: 'ace/mode/java'
}, {
  name: 'Text',
  path: 'ace/mode/text'
}, {
  name: 'G++',
  path: 'ace/mode/c_cpp'
}, {
  name: 'GCC',
  path: 'ace/mode/c_cpp'
}, {
  name: 'Python',
  path: 'ace/mode/python'
}]

export default {
  props: {
    value: String,
    language: String,
    readOnly: ''
  },
  data () {
    return {
      aceEditor: null,
      toggle: false,
      wrap: true,
      EditThemePath: 'ace/theme/dracula',
      ReadOnlyThemePath: 'ace/theme/eclipse',
      modePath: 'ace/mode/java',
      modeArray: modeArray
    }
  },
  mounted () {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 28,
      minLines: 28,
      fontSize: 16,
      value: this.value ? this.value : '',
      theme: this.readOnly ? this.ReadOnlyThemePath : this.EditThemePath,
      mode: this.modePath,
      wrap: this.wrap,
      tabSize: 4
    })

    // 激活自动提示
    this.aceEditor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    })
    this.handleModelPathChange(this.language)
    this.logger.i(this.language)
    this.aceEditor.getSession().on('change', this.change)
    this.aceEditor.setReadOnly(this.readOnly)
  },
  methods: {
    change () {
      this.$emit('input', this.aceEditor.getSession().getValue())
    },
    handleModelPathChange (language) {
      for (let i = 0; i < modeArray.length; i++) {
        if (language === modeArray[i].name) {
          this.modePath = modeArray[i].path
          this.aceEditor.getSession().setMode(this.modePath)
          break
        }
      }
    }
  },
  watch: {
    language (val) {
      this.handleModelPathChange(this.language)
    },
    value (val) {
      this.aceEditor.getSession().setValue(this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
.ace-container {
  min-height: 100px;
  // position: relative;
}
</style>
