<template>
  <!-- TODO: add by axiang [20190702] 增加更多可视化的图表之类的内容 -->
  <div class="view-body">
    <el-card class="head-card">
      <el-row :gutter="0">
        <el-col :span="5">
          <div><span>评测结果: </span>
            <el-tag
              :type="'Accepted'===jadgeStatu?'success':'Pendding...'===jadgeStatu?'warning':'danger'"
              size="medium"
            >{{jadgeStatu?jadgeStatu:'-'}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>评测ID: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{runId?runId:'-'}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>题目ID: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{problem?problem:'-'}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>编程语言: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{languge?languge:'-'}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>提交人: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{author?author:'-'}}</el-tag>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="head-card">评测详情：
      <pre>{{ceInfoStr?ceInfoStr:'无'}}</pre>
    </el-card>
    <div class="code-box">
      <aceEditor
        class="code-editor"
        :language="this.languge"
        :readOnly="true"
        :value="this.code"
      ></aceEditor>
    </div>
  </div>
</template>
<script>
import aceEditor from '@/components/common/AceEditor'
export default {
  components: {
    aceEditor
  },
  data () {
    return {
      code: '',
      problem: '',
      jadgeStatu: '',
      runId: '',
      languge: '',
      author: '',
      ceInfoStr: ''
    }
  },
  methods: {
    async getCode () {
      let params = new URLSearchParams()
      params.append('id', this.$route.query.id)
      params.append('username', this.$store.getters.getUsername)
      let dataStatusCode = await this.$http
        .get('/status/getStatusById', params)
        .catch(() => {
        })
      console.log(dataStatusCode)
      if (dataStatusCode.code === 100) {
        let dataTemp = dataStatusCode.datas[0]
        this.runId = dataTemp.id
        this.author = dataTemp.nick
        this.problem = dataTemp.pid
        this.jadgeStatu = dataTemp.otherinfo
        this.id = dataTemp.pid
        this.languge = dataTemp.submitlanguage
        this.code = dataTemp.code
      } else {
        this.$message.error(dataStatusCode.msg)
      }
    },
    async getCeInfo () {
      let params = new URLSearchParams()
      params.append('rid', this.$route.query.id)
      let dataCeInfo = await this.$http
        .get('/ceinfo/getCeInfo', params)
        .catch(() => {
        })
      this.ceInfoStr = dataCeInfo.datas[0].info
    }

  },
  mounted () {
    if (this.$store.getters.getIsLogin) {
      this.getCeInfo()
      this.getCode()
    } else {
      this.$message.warning('登录后查看！')
    }
  }

}
</script>
<style scoped>
.view-body {
  float: left;
  width: 100%;
  margin: 0;
  margin-bottom: 15px;
  padding: 0;
  min-height: 100px;
}

.head-card {
  width: 86%;
  /* height: 40px; */
  display: block;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0;
  background-color: #eeeeee;
}

.el-tag {
  font-size: 15px;
}

.code-box {
  width: 86%;
  margin: auto;
  min-height: 100px;
}
</style>
