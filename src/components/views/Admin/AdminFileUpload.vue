<template>
  <div class="body">
    <el-upload
      class="upload-demo"
      name="file"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :file-list="fileList"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >上传文件到服务器中</div>
    </el-upload>
  </div>
</template>

<script>
const config = require('../../../../config/oj.config.json')

export default {
  data () {
    return {
      url: '',
      fileList: []
    }
  },
  created () {
    this.url = config.apiUrl + '/file/uploadFile'
  },
  methods: {
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style>
.body {
  width: 100%;
  min-height: 400px;
}
</style>
