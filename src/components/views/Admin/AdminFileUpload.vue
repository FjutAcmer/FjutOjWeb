<template>
  <div class="body">
    <el-upload
      class="upload-demo"
      name="file"
      action="http://210.34.193.212:8080/api/file/uploadFile"
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
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    methods: {
      handleRemove (file, fileList) {
        // console.log(file, fileList)
      },
      handlePreview (file) {
        // console.log(file)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
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
