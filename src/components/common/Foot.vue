<template>
  <div class="foot-box">
    <div class="foot-box-main">
      <h2>FJUT Online Judge</h2>
    </div>
    <div class="foot-box-item">
      <ul>
        <li>
          [
          <a href="#">Bug反馈</a>]
        </li>
        <li>
          [
          <a href="#">FAQ</a>]
        </li>
        <li>
          [
          <a href="#">闽ICP备17026590号-1</a>]
        </li>
      </ul>
    </div>
    <div class="foot-box-information">
      <ul>
        <li>
          <strong>系统时间：</strong>
          {{date}}
        </li>
        <li>
          <strong>当前版本：</strong>
          <a href="#">3.22</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date().toLocaleString('chinese', {hour12: false})
    }
  },
  mounted () {
    var _this = this // 声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date().toLocaleString('chinese', {hour12: false}) // 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在vue实例销毁钱，清除我们的定时器
    }
  }
}
</script>

<style>
.foot-box {
  padding: 0 5% 0 5%;
  margin: 0;
  width: 90%;
  height: 10%;
  font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
  font-size: 15px;
  background-color: #eeeeee;
}

.foot-box a {
  text-decoration: none;
  color: #475669;
}

.foot-box a:hover {
  color: blue;
}

.foot-box-main {
  padding: 0;
  padding-right: 20px;
  float: left;
  border-right: white solid 2px;
}

.foot-box-information {
  padding: 0;
  margin: 0;
  float: right;
}

.foot-box-information ul li {
  list-style: none;
}

.foot-box-item {
  float: left;
  font-size: 16px;
  line-height: 40px;
}

.foot-box-item ul {
  list-style: none;
}

.foot-box-item ul li {
  float: left;
  margin-right: 15px;
}
</style>
