<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in newsList" :key="item">
        <div class="div-card-item" v-html="item">{{item}}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsList: [
        // TODO: add by axiang [20190703] 滚动栏的内容设置为从数据库获取，暂时没有表，需要增加新表，待做
        '欢迎进入<strong>一码当先在线编程系统</strong>，您在这里做的每一道题都将成为您的知识储备里<strong>最结实的一块砖！</strong>',
        '现任开发团队：<strong>吴宇翔、吴盛涛、郑佳缘、康志江 </strong>等',
        '当前版本 1.0'
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.div-card-item {
  width: 80%;
  margin-top: 8%;
  margin-left: 10%;
  font-size: 25px;
}
</style>
