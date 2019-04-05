<template>
    <div class="container">
        <el-card class="box-card">
            <div class="head">
                <img src="">
            </div>
            <div class="name">
                <h2>{{name}}</h2>
            </div>
            <div class="detail">
            </div>
        </el-card>
        <el-card class="box-card" style="height:600px">

        </el-card>
        <el-card class="box-card" style="height:600px">

        </el-card>
        <el-card class="box-card" style="height:600px">

        </el-card>
        <el-card class="box-card" style="height:200px">

        </el-card>
        <el-card class="box-card" style="height:200px">

        </el-card>
        <el-card class="box-card" style="height:200px">

        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:MINI
        }
    }
}
</script>

<style scoped>
.container{
    padding: 0;
    margin:10px 10% 10px 10%;
}

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }

.head{
    margin: 0;
    padding: 0;
    height: 300px;
    width: 100%;
}

.head .img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: solid 6px rgba(255,255,255,0.3);
}

.name{
    margin: 0;
    padding: 0;
    height: 150px;
    width: 100%;
}

.detail{
    margin: 0;
    padding: 0 25px 0 25px;
    height: 500px;
    width: 100%;
}
</style>
