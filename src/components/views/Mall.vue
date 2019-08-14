<template>
  <!-- add by foxfox [20190812]  -->
  <div class="mall-body">
    <div class="block">
      <el-carousel>
        <el-carousel-item
          v-for="item in 4"
          :key="item"
        >
          <div class="picture">
            <el-image :src="src" :fit="fits"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-container>
      <el-main class="product-main">
        <el-col
          :span="4"
          v-for="(o) in dataMallInfo"
          :key="o.id"
          class="main-col"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="product-card"
          >
            <div
              class="product-box"
              @click="toProductDetail(o.id)"
            >
              <el-image
                src="http://www.fjutacm.com/pic/defaulthead.jpg"
                class="image"
              ></el-image>
              <div>
                <font size="4">{{o.title}}</font>
                <br />
                <font
                  size="5"
                  color="orange"
                >{{o.acb}}</font>ACB
              </div>
            </div>
          </el-card>
        </el-col>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>

</template>

<script>
export default {
  data () {
    return {
      dataMallInfo: '',
      fits: ['none'],
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565605041042&di=96861ed2d333564674f15042571c6497&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F73537f118ccb2540ac0a49e2cb57cd74469444c2a608a-yNTFeJ_fw658'
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    toProductDetail (gid) {
      if (this.$store.getters.getIsLogin) {
        this.$router.push({ path: 'ProductDetail', query: { id: gid } })
      } else {
        this.$message.warning('登录后才能查看详情哦！')
      }
    },
    async getdata () {
      let dataMall = await this.$http.get('/mall/getMallGoods').catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
      })
      this.dataMallInfo = dataMall.datas[0]
    }
  }

}
</script>

<style scoped>
.mall-body {
  width: 90%;
  min-height: 800px;
  margin: auto;
  background-color: #fafafa;
}

.el-carousel__item h3 {
  color: #fafafa;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  height: 200px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #fafafa;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #fafafa;
}

.block {
  width: 1000px; /* 改变图片大小 */
  margin: auto;
}

.picture {
  height: 100px;
  width: 100%;
  margin: auto;
}

.image {
  width: 100%;
  display: block;
}

.product-main {
  width: 1400px;
  margin: 0;
}

.main-col {
  margin-left: 90px;
}

.product-card {
  cursor: pointer;
  height: 310px;
  margin-bottom: 20px;
}

.product-box {
  width: 100%;
  height: 310px;
}
</style>
