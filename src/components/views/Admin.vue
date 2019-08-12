<template>
  <div class="admin-body">
    <el-card
      id="admin"
      class="admin-card"
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
          <AddLocalProblem></AddLocalProblem>
        </el-tab-pane>
        <!-- <el-tab-pane label="测试">测试</el-tab-pane> -->
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import AddProblem from '../views/Admin/AdminAddProblem'
import AddLocalProblem from '../views/Admin/AdminAddLocalProblem'
export default {
  data () {
    return {

    }
  },
  components: {
    AddProblem,
    AddLocalProblem
  }
}
</script>

<style scoped>
.admin-body {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  min-height: 400px;
  /* min-height: 400px; */
}

.admin-card {
  min-height: 400px;
}
</style>
