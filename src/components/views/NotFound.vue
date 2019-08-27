<template>
  <div class="notfound-body">
    <div class="left-body">
      <el-image
        class="notfound-pic"
        :src="url"
      ></el-image>
      <span class="info-font">访问的界面不存在，<el-link
          type="primary"
          style="font-size:18px;"
          @click="reload"
          :underline="false"
        >刷新</el-link>试试？</span>
      <br />
      <span class="info-font">如果你觉得这是系统BUG,请 <el-link
          type="primary"
          style="font-size:18px;"
          @click="goReportBug"
          :underline="false"
        >反馈BUG</el-link></span>
    </div>
    <div class="right-body">

    </div>
    <BugReport :dialogVisible="showBugReport" @visiable="changeVisiable"></BugReport>
  </div>
</template>

<script>
import BugReport from '../common/BugReportComponent'
export default {
  components: {
    BugReport
  },
  data () {
    return {
      url: require('../../assets/image/404.jpg'),
      showBugReport: false
    }
  },
  methods: {
    reload () {
      this.$router.go(0)
    },
    goReportBug () {
      this.showBugReport = true
    },
    changeVisiable (val) {
      this.showBugReport = false
    }
  }
}
</script>

<style scoped>
.notfound-body {
  width: 90%;
  margin: auto;
}

.notfound-pic {
  width: 300px;
  height: 300px;
  float: left;
}

.left-body {
  width: 60%;
  min-height: 350px;
  float: left;
}

.right-body {
  width: 30%;
  min-height: 350px;
  float: left;
}

.info-font {
  float: left;
  font-size: 20px;
  line-height: 40px;
}
</style>
