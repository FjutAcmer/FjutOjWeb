<template>
  <!-- add by foxfox [20190812]  -->
  <div class="mall-body">
    <div class="pic-block">
      <el-carousel>
        <el-carousel-item
          v-for="item in 4"
          :key="item"
        >
          <el-image
            class="picture"
            :src="src"
            :fits="fits"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-col
      :span="4"
      v-for="(o) in dataMallInfo"
      :key="o.id"
      class="main-col"
    >
      <el-card
        class="product-card"
        shadow="hover"
        :body-style="{ padding: '0px' }"
      >
        <div
          class="product-box"
          @click="toProductDetail(o.id)"
        >
          <el-image
            src="https://uploadfiles.nowcoder.com/images/20190802/59_1564751822240_A3E11644B0F36A72563D1971588638CA"
            class="image"
          ></el-image>
          <div>
            <font size="4">{{o.title}}</font>
            <br />
            <font
              size="5"
              color="orange"
            >{{o.acb}}</font>课程
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataMallInfo: [{}, {}, {}, {}],
      fits: ['scale-down'],
      src: 'http://img.haokecheng.com/upimages/FB/8E/59/BB/02E9AA62.jpg'
    }
  },
  mounted () {
    this.getLessons()
  },
  methods: {
    toProductDetail (gid) {
      if (this.$store.getters.getIsLogin) {
        this.$router.push({ path: 'ProductDetail', query: { id: gid } })
      } else {
        this.$message.warning('登录后才能查看详情哦！')
      }
    },
    async getLessons () {
      // let dataMall = await this.$http.get('/mall/getMallGoods')
      // if (dataMall.code === 100) {
      //   this.dataMallInfo = dataMall.datas[0]
      // } else {
      //   this.$message.warning('没有任何商品')
      // }
    }
  }

}
</script>

<style scoped>
.mall-body {
  width: 85%;
  min-height: 800px;
  margin: auto;
  background-color: #fafafa;
}

.pic-block {
  width: 85%;
  margin: auto;
}

.picture {
  height: 250px;
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
