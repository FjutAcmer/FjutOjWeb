<template>
  <div class="submit-body">
    <SubmitComponent :pid="this.$route.query.pid"></SubmitComponent>
  </div>
</template>

<script>
import SubmitComponent from './Submit/SubmitComponent'
export default {
  components: {
    SubmitComponent
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Status') {
      next()
    } else {
      this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => { })
    }
  }

}
</script>

<style scoped>
.submit-body {
  width: 95%;
  margin: auto;
  margin-top: 0px;
  min-height: 700px;
  font-size: 15px;
}
</style>
