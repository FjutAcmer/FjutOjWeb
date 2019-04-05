<template>
  <div class="foot-box">
    <ul>
        <li><h2>T^T Online Judge</h2></li>
        <li><ul class="foot-information">
            <li>Bug反馈</li> |
            <li>Faq</li> |
            <li>闽ICP备17026590号-1</li>
        </ul></li>
        <li style="float:left">当前版本：<a href="#" style="text-decoration:none">3.22</a></li>
        <li style="float:right">系统时间：{{date}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            date: new Date().toString()
        };
    },
    mounted () {
        var _this = this; //声明一个变量指向vue实例this,保证作用域一致
        this.timer = setInterval(() => {
        _this.date = new Date().toString(); // 修改数据date
        }, 1000)
    },
    beforeDestroy () {
        if(this.timer) {
            clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
        }
    }    
}
</script>

<style>
.foot-box {
  padding:0 10% 0 10%;
  margin: 0;
  border-top: 2px solid #eeeeee;
  width: 80%;
  height: 20%;
  font-family: '微软雅黑',"宋体","Arial Narrow",Helvetica,sans-serif;
  font-size: 14px;
  background-color: #eeeeee;
}

.foot-box ul{
    padding: 0;
    margin: 0;
    list-style: none;
    line-height: 50px;
    display: block;
}

.foot-information{
    padding: 0;
    margin-top: 0;
    list-style: none;
}

.foot-information li{
    display: inline-block;
}
</style>
