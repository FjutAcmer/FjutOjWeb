<template>
  <div class="foot-box">
    <h1 class="title-span">FJUT Online Judge<span class="version-span"> v3.2</span></h1>
    <div class="link-box">
      <el-link>BUG反馈</el-link> |
      <el-link>FAQ</el-link> |
      <el-link>开发团队</el-link> |
      <el-link>加入我们</el-link> |
      <el-link>闽ICP备xxxxxxxx号-1</el-link>
    </div>
    <span class="power-span">Power by ©515项目组-FJUTOJ</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date().toLocaleString('chinese', { hour12: false })
    }
  },
  mounted () {
    var _this = this // 声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date().toLocaleString('chinese', { hour12: false }) // 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在vue实例销毁钱，清除定时器
    }
  }
}
</script>

<style scoped>
.foot-box {
  float: left;
  margin: 0;
  width: 100%;
  height: auto;
  font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
  font-size: 15px;
  background-color: #eeeeee;
}

.title-span {
  margin: 4px;
}

.version-span {
  font-size: 14px;
}

.link-box {
  margin-bottom: 10px;
  padding: 0px;
}

.power-span {
  margin: 5px;
}
</style>
