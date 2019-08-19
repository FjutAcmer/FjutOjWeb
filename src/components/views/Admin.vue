<template>
  <div class="admin-body">
    <el-card
      id="admin"
      class="admin-card"
      v-if="this.$store.getters.getIsAdmin"
    >
      <div slot="header">
        <span>欢迎您，管理员：{{this.$store.getters.getUsername}}</span><br />
        <!-- <span>您拥有以下权限：</span> -->
      </div>
      <el-tabs
        type="border-card"
        tab-position="left"
      >
        <!-- <el-tab-pane label="新增题目"><AddProblem></AddProblem></el-tab-pane> -->
        <el-tab-pane label="本地题目">
          <LocalProblem></LocalProblem>
        </el-tab-pane>
        <el-tab-pane label="文件上传">
          <FileUpload></FileUpload>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card
      id="admin"
      class="admin-card"
      v-else
    ><h1>对不起，你没有权限</h1></el-card>
  </div>
</template>

<script>
import AddProblem from '../views/Admin/AdminAddProblem'
import LocalProblem from '../views/Admin/AdminLocalProblem'
import FileUpload from '../views/Admin/AdminFileUpload'
export default {
  data () {
    return {

    }
  },
  components: {
    AddProblem,
    LocalProblem,
    FileUpload
  }
}
</script>

<style scoped>
.admin-body {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  min-height: 400px;
}

.admin-card {
  min-width: 1200px;
  min-height: 400px;
}
</style>
