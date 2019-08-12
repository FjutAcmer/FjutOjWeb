<template>
  <!-- 放HTML代码  -->
  <div class="body">
    <el-container>
      <el-main>
        <div class="picture">
          <el-carousel indicator-position="outside" height="400px" width="75px">
              <el-carousel-item v-for="item in 4" :key="item">
              <div class="block" >
                <br><br><br><br> <br>
              <el-image :src="src" ></el-image>
              </div>
              </el-carousel-item>
          </el-carousel>
        </div>
        <div
          class="goods"
        >
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >
          <br><br><br><br><br>
            <el-form-item label="商品名称">{{dataMallInfo.title}}
            </el-form-item>
            <el-form-item label="商品单价">{{dataMallInfo.acb}}ACB
            </el-form-item>
            <el-form-item label="个数"> <el-input-number v-model="num" @change="handleChange" :min="1" :max="dataMallInfo.buyLimit" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="取货地点">
               C3-515实验室
            </el-form-item>
            <el-form-item>
               <el-button @click="dianji02" type="danger" >立刻购买</el-button>
            </el-form-item>
          </el-form>
        </div>
        </el-main>
    </el-container>
         <h1>商品详情</h1>
        <div
        class="xiangqing"
        v-html="dataMallInfo.des"
        >
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataMallInfo: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      fits: ['none'],
      src: 'http://pic22.nipic.com/20120622/10305018_153841644160_2.jpg',
      num: 1
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    dianji02 () {
      this.$confirm('是否购买?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.buy()
      }).catch(() => {

      })
    },
    onSubmit () {
      console.log('submit!')
    },
    handleChange (value) {
      console.log(value)
    },
    async getdata () {
      let params = new URLSearchParams()
      params.append('id', this.$route.query.id)
      let dataMall = await this.$http.get('/mall/getMallGoodsById', params).catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
      })
      this.dataMallInfo = dataMall.datas[0]
      console.log(dataMall)
    },
    async buy () {
      let username = this.$store.getters.getUsername
      let id = this.dataMallInfo.id
      let number = this.num
      let params = new URLSearchParams()
      params.append('buyNum', number)
      params.append('goodsId', id)
      params.append('username', username)
      let dataOrdel = await this.$http.post('/order/createOrder', params).catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
      })
      if (dataOrdel.code === 100) {
        this.$message({
          type: 'success',
          message: dataOrdel.msg
        })
      }
      if (dataOrdel.code === 200) {
        this.$message({
          type: 'error',
          message: dataOrdel.msg
        })
      }
    }
  }
}
</script>

<style scoped>
.body {
  min-height: 400px;
  margin: auto;
  background-color: #ffffff;
}
.goods {
  width: 700px;
  height: 500px;
  float: right;
}
.picture {
  float: left;
  width: 400px;
  height: 400px;
  margin-left: 150px;
  background: #ffffff;
}
.block{
  height: 200px;
  margin: auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}

</style>
