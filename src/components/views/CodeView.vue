<template>
<!-- FIXME: add by axiang [20190702] 能否查看代码的判断逻辑不清，显示的代码不完整，功能不完整。学长挖的坑，记得填-->
<!-- TODO: add by axiang [20190702] 改中文显示，增加更多可视化的图表之类的内容 -->
  <div class="docker">
    <el-card :body-style="{ padding: '0px' }" class="head-card">
      <span class="head-span">
        <span style="color:green">题目ID:</span>
        &nbsp;{{problem}}&nbsp;&nbsp;&nbsp;
        <span style="color:green">评测结果:</span>
        &nbsp;{{jadgeStatu}}&nbsp;&nbsp;&nbsp;
        <span style="color:green">评测ID:</span>
        &nbsp;{{runId}}&nbsp;&nbsp;&nbsp;
        <span style="color:green">编程语言:</span>
        &nbsp;{{languge}}&nbsp;&nbsp;&nbsp;
        <span style="color:green">提交人:</span>
        &nbsp;{{author}}
      </span>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <!-- <span style="float:left">
        <pre
          style="text-align:left;font-size:20px;margin:10px 10px 10px 10px;padding-right:10px"
          v-html="code"
        ></pre>
      </span> -->
      <div class="code-view" ><pre>{{code}}</pre></div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      code: '',
      problem: '',
      jadgeStatu: '',
      runId: '',
      languge: '',
      author: ''
    }
  },
  methods: {
    async getCode () {
      let params = new URLSearchParams()
      params.append('id', this.$route.query.id)
      params.append('user', this.$store.getters.getUsername)
      let dataStatusCode = await this.$http
        .post('/status/getStatusById', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          // return
        })
      if (dataStatusCode.code === 100) {
        let dataTemp = dataStatusCode.datas[0]
        this.runId = dataTemp.id
        this.author = dataTemp.ruser
        this.problem = dataTemp.pid
        this.jadgeStatu = dataTemp.otherinfo
        this.id = dataTemp.pid
        this.languge = dataTemp.lang.submitlanguage
        this.code = dataTemp.code
      } else {
        this.code = dataStatusCode.msg
      }
    }
  },
  mounted () {
    this.getCode()
  }
}
</script>
<style scoped>
.docker {
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100%;
}

.box-card {
  width: 86%;
  min-height: 600px;
  display: block;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 0;
}

.head-card {
  width: 86%;
  height: 70px;
  display: block;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 0;
  background-color: beige;
}

.head-span {
  font-size: 20px;
  line-height: 70px;
}

.code-view {
  text-align: left;
  font-size: 20px;
  margin: 10px 10px 10px 10px;
  padding-right: 10px;
}
</style>
