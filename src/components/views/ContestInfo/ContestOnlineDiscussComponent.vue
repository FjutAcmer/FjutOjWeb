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
      src: 'http://39.100.235.47:8888/index.html?token=%7B%22to%22%3A%22%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%91%A8%E8%B5%9B%22%2C%22from%22%3A%22carol%22%2C%22type%22%3A%22group%22%7D&msg=%22%22&mode=kefu&res=fwh5_desktop'
    }
  }
}
</script>

<style scoped>

</style>
