<template>
  <div class="problem">
    <el-card
      class="box-card"
    >
    <div slot="header">评测列表</div>
    <StatusComponent></StatusComponent>
    </el-card>
  </div>
</template>

<script>
import StatusComponent from '../views/Status/StatusComponent'
export default {
  data () {
    return {
    }
  },
  components: {
    StatusComponent
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  beforeRouteLeave (to, from, next) {
    // 如果是点击到代码详情或者题目列表时，离开评测页面时让评测页面缓存
    if (to.name === 'CodeView' || to.name === 'Submit') {
      from.meta.keepAlive = true
    } else {
      // 否则，离开评测页面不缓存
      from.meta.keepAlive = false
    }
    next()
  }
}
</script>

<style scoped>
.problem {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
  display: block;
  font-family: 微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box-card {
  width: 85%;
  min-height: 450px;
  display: block;
  margin: auto;
  margin-bottom: 2%;
  padding: 0;
}

.problem-filter {
  margin: 0;
  padding: 10px 15px;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
  width: 100%;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-input {
  width: 180px;
}
</style>
