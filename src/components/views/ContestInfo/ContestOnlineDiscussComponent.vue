<template>
  <div>
    <iframe
    :src="src"
    width="100%" height="800px"
    frameborder="0"
    name="iframe名称"
    scrolling="yes">
</iframe></div>
</template>

<script>
export default {
  data () {
    return {
      // TODO: 指定在线聊天的api地址
      src: 'http://www.baidu.com'
    }
  }
}
</script>

<style scoped>

</style>
