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
        '大家注意不要对题目进行<strong>过量提交</strong>，以免爬虫被封，如果实在要交很多发，请自行跳转到对应提交。',
        '目前本OJ只支持HDU和PKU两个OJ的题目，想写其他OJ题目的请自行到对应OJ提交题目',
        '有意思'
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
