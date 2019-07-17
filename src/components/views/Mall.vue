<template>
  <!-- 放HTML代码  -->
  <div class="body">
    <el-carousel
      :interval="4000"
      type="card"
      height="300px"
    >
      <el-carousel-item
        v-for="item in 3"
        :key="item"
      >
        <div class="block">
          <!-- <h3>热销商品</h3> -->
          <el-image :src="src"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>

    <el-container>
      <el-main class="main1">
        <el-row>
          <el-col
            :span="4"
            v-for="(o) in dataMallInfo "
            :key="o"
            class="maincol"
          >
            <el-card
              shadow="hover"
              :body-style="{ padding: '0px' }"
              class="kapian"
            >
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              >
              <div style="padding: 2px;">
                <span class="titlesize">{{o.title}}</span>
                <br>
                所需{{o.acb}}币
                <div class="bottom clearfix">
                  <el-button
                    @click="dianji"
                    type="primary"
                  >购买</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
      src: 'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    dianji () {
      this.$router.push({ path: 'dianji2' })
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
  line-height: 300px;
  margin: 0;
}
.kapian {
  margin-bottom: 20px;
}
/* .kapian:hover{
background: red
} */
.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
.bottom {
  margin-top: 5px;
  line-height: 5px;
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
.maincol {
  margin-left: 90px;
}
.titlesize {
  font-size: 12px;
}
</style>
