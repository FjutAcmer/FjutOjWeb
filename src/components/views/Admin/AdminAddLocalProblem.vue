<template>
  <div class="body">
    标题：
    <el-input
      placeholder="请输入标题"
      style="width:380px"
      v-model="problemTitle"
      size="medium"
    ></el-input>
    <br /> <br />
    时间限制（MS）：
    <el-input
      placeholder="请输入时间限制（MS）"
      style="width:300px"
      v-model="timeLimit"
      size="medium"
    ></el-input>
    <br /> <br />
    空间限制（MB）：
    <el-input
      placeholder="请输入空间限制（MB）"
      style="width:300px"
      v-model="memoryLimit"
      size="medium"
    ></el-input>
    <br /> <br />
    作者：
    <el-input
      placeholder="可以为空"
      style="width:380px"
      v-model="memoryLimit"
      size="medium"
    ></el-input>
    <br /><br />
    <el-checkbox v-model="spj" size="medium">是否特判</el-checkbox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      problemTitle: '',
      timeLimit: '',
      memoryLimit: '',
      spj: false
    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 400px;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
</style>>
