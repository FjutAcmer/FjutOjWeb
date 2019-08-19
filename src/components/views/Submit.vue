<template>
  <div class="submit-body">
    <SubmitBody :pid="this.$route.query.pid"></SubmitBody>
  </div>
</template>

<script>
import SubmitBody from './Submit/SubmitBody'
export default {
  components: {
    SubmitBody
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
