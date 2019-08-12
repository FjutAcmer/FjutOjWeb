<template>
  <!-- 放HTML代码  -->
  <div class="body">
      <div class="block" >
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="picture">
        <el-image :src="src"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
    <el-container>
      <el-main class="main1">

          <el-col
            :span="4"
            v-for="(o) in dataMallInfo "
            :key="o"
            class="main-col"
          >
            <el-card
              shadow="hover"
              :body-style="{ padding: '10px' }"
              class="card"
               @click="handleClick(o.id)"
            >
              <img
                src="http://www.fjutacm.com/pic/defaulthead.jpg"
                class="image"
                 @click="handleClick(o.id)"
              >
              <div style="padding: 2px;"
               @click="handleClick(o.id)"
               >
                <font size="4">{{o.title}}</font>
                <br>
                <font size="5" color="orange">{{o.acb}}</font>ACB
              </div>
            </el-card>
            <br>
            <br>
          </el-col>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>

</template>

<script>
export default {
  data () {
    return {
      dataMallInfo: '',
      fits: ['none'],
      src: 'http://pic22.nipic.com/20120622/10305018_153841644160_2.jpg'
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    handleClick (gid) {
      this.$router.push({ path: 'dianji2', query: {id: gid} })
    },
    async getdata () {
      let dataMall = await this.$http.get('/mall/getMallGoods').catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
      })
      this.dataMallInfo = dataMall.datas[0]
      console.log(this.dataMallInfo)
    }
  }

}
</script>

<style scoped>
.body {
  min-height: 800px;
  margin: auto;
  background-color: #ffffff;
}

    .el-carousel__item h3 {
    color: #ffffff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    height: 200px;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #ffffff;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #ffffff;
  }
  .block{
    width: 500px; /*改变图片大小 */
    margin: auto;
  }
  .picture{
    height: 100px;
    margin: auto;
  }
.bottom {
  margin-top: 5px;
  line-height: 10px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.main1 {
  width: 1400px;
  margin: auto;
}
.main-col {
  margin-left: 90px;
}
.titlesize {
  font-size: 12px;
}
.card{
  height: 300px;
}
</style>
