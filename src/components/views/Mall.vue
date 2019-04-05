<template>
    <div class="mallframe">
        <el-row v-for="(o, index) in listrow" :key="o" :offset="index > 0 ? 2 : 0" :type="flex" :justify="center" :align="middle">
            <el-col :span="4" v-for="(o, index) in listcol" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px'}" class="card">
                    <div v-if="isloading" style="height:200px" class="column">
                        <div class="container animation-5">
                            <div class="shape shape1"></div>
                            <div class="shape shape2"></div>
                            <div class="shape shape3"></div>
                            <div class="shape shape4"></div>
                        </div>
                    </div>
                    <img src="" class="image" v-else>
                    <div style="margin-top:10px">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <p class="time">{{ currentDate }}ACB</p>
                            <p class="button">剩余：{{residue}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isloading:true,
            listrow:4,
            listcol:4,
            currentDate:100,
            residue:30,
        }
    }
}
</script>

<style scoped>
.mallframe{
  margin: 3% 10% 3% 10%;
  width: 80%;
  height: 94%;
  padding: 0;
}

.el-row {
    margin-bottom: 20px;
}

.card{
  height: 300px;
  width: 250px;
  padding: 0;
  margin: 0;
}

.column {
  width: 100%;
  height: 100%;
  background-color: #040038;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time {
    font-size: 13px;
    color: #999;
    float: left;
    margin-left: 10px;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 20px;
  }

  .button {
    font-size: 13px;
    color: #999;
    float: right;
    margin-right: 10px;
  }

  .image {
    width: 100%;
    height: 80%;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .animation-5 .shape1 {
  animation: animation5shape1 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
  50% {
    -webkit-transform: translate(15px, 15px);
            transform: translate(15px, 15px);
  }
  75% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
}

@keyframes animation5shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
  50% {
    -webkit-transform: translate(15px, 15px);
            transform: translate(15px, 15px);
  }
  75% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
}
.animation-5 .shape2 {
  animation: animation5shape2 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
  50% {
    -webkit-transform: translate(-15px, 15px);
            transform: translate(-15px, 15px);
  }
  75% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
}

@keyframes animation5shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
  50% {
    -webkit-transform: translate(-15px, 15px);
            transform: translate(-15px, 15px);
  }
  75% {
    -webkit-transform: translate(0, 15px);
            transform: translate(0, 15px);
  }
}
.animation-5 .shape3 {
  animation: animation5shape3 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
  50% {
    -webkit-transform: translate(15px, -15px);
            transform: translate(15px, -15px);
  }
  75% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
}

@keyframes animation5shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(15px, 0);
            transform: translate(15px, 0);
  }
  50% {
    -webkit-transform: translate(15px, -15px);
            transform: translate(15px, -15px);
  }
  75% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
}
.animation-5 .shape4 {
  animation: animation5shape4 2s ease 0s infinite reverse;
}

@-webkit-keyframes animation5shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
  50% {
    -webkit-transform: translate(-15px, -15px);
            transform: translate(-15px, -15px);
  }
  75% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
}

@keyframes animation5shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -15px);
            transform: translate(0, -15px);
  }
  50% {
    -webkit-transform: translate(-15px, -15px);
            transform: translate(-15px, -15px);
  }
  75% {
    -webkit-transform: translate(-15px, 0);
            transform: translate(-15px, 0);
  }
}

.container {
  width: 30px;
  height: 30px;
  position: relative;
}

.container.animation-5 .shape {
  width: 15px;
  height: 15px;
}

.container .shape {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 1px;
}

.container .shape.shape1 {
  left: 0;
  background-color: #5C6BC0;
}
.container .shape.shape2 {
  right: 0;
  background-color: #8BC34A;
}
.container .shape.shape3 {
  bottom: 0;
  background-color: #FFB74D;
}
.container .shape.shape4 {
  bottom: 0;
  right: 0;
  background-color: #F44336;
}
</style>
