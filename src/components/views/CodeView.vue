<template>
  <!-- FIXME: add by axiang [20190702] 能否查看代码的判断逻辑不清，显示的代码不完整，功能不完整。学长挖的坑，记得填-->
  <!-- TODO: add by axiang [20190702] 改中文显示，增加更多可视化的图表之类的内容 -->
  <div class="view-body">
    <el-card class="head-card">
      <el-row :gutter="0">
        <el-col :span="5">
          <div><span>评测结果: </span>
            <el-tag
              :type="'Accepted'===jadgeStatu?'success':'danger'"
              size="medium"
            >{{jadgeStatu}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>评测ID: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{runId}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>题目ID: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{problem}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>编程语言: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{languge}}</el-tag>
          </div>
        </el-col>
        <el-col :span="4">
          <div><span>提交人: </span>
            <el-tag
              type="primary"
              size="medium"
            >{{author}}</el-tag>
          </div>
        </el-col>
      </el-row>
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
      author: ''
    }
  },
  methods: {
    async getCode () {
      let params = new URLSearchParams()
      params.append('id', this.$route.query.id)
      params.append('user', this.$store.getters.getUsername)
      let dataStatusCode = await this.$http
        .get('/status/getStatusById', params)
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
        this.languge = dataTemp.submitlanguage
        this.code = dataTemp.code
      } else {
        this.code = dataStatusCode.msg
      }
      console.log(this.code)
    }
  },
  created () {
    this.getCode()
  }

}
</script>
<style scoped>
.view-body {
  width: 100%;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  min-height: 100%;
}

.head-card {
  width: 86%;
  /* height: 40px; */
  display: block;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 2%;
  margin-top: 2%;
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
