<template>
  <div class="foot-box">
    <div class="foot-box-main">
      <h2>FJUT Online Judge</h2>
    </div>
    <div class="foot-box-item">
      <ul>
        <li>
          [<a href="#">Bug反馈</a>]
        </li>
        <li>
          [<a href="#">FAQ</a>]
        </li>
        <li>
         [<a href="#">闽ICP备17026590号-1</a>]
        </li>
      </ul>
    </div>
    <div class="foot-box-information">
      <ul>
        <li>
          <strong>当前版本：</strong>
          <a href="#">3.22</a>
        </li>
        <li>
          <strong>系统时间：</strong>
          {{date}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toLocaleString()
    };
  },
  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date().toLocaleString(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color:#475669;
}

a:hover {
  color: blueviolet;
}

.foot-box {
  padding: 0 5% 0 5%;
  margin: 0;
  /* border-top: 2px solid #eeeeee; */
  width: 90%;
  height: 10%;
  font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
  font-size: 15px;
  background-color: #eeeeee;
}

.foot-box-main {
  padding: 0;
  /* margin-right: 10px; */
  padding-right: 20px;
  float: left;
  border-right: white solid 2px;
}

.foot-box-information {
  padding: 0;
  margin: 0;
  float: right;
  /* background-color: aqua; */
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
  /* float: left; */
  list-style: none;
  /* background-color: red; */
  /* display: inline-block; */
}

.foot-box-item ul li {
  /* background-color: aquamarine; */
  float: left;
  margin-right: 15px;
}
</style>
