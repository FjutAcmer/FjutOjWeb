<template>
  <div class="submit-body">
    <div class="left-box">
      <el-scrollbar style="height:100%">
        <div class="title-box">
          <h1 class="title-font">{{this.dataProblemDetail.title?this.dataProblemDetail.title:'题目'}}</h1>
          时间限制: <el-tag type="info">{{this.dataProblemMain.timelimit?this.dataProblemMain.timelimit:'0MS'}}</el-tag>
          内存限制:<el-tag type="info">{{this.dataProblemMain.menorylimit?this.dataProblemMain.menorylimit:'0KB'}}</el-tag>
          <br />64位Integer的IO类型:<el-tag type="info">{{this.dataProblemMain.int64?this.dataProblemMain.int64:'-'}}</el-tag>
        </div>
        <div v-if="this.$store.getters.getIsLogin">
          <el-link
            v-if="this.problemIsAc"
            type="success"
            icon="el-icon-check"
          >已解决</el-link>
          <el-link
            v-else
            type="danger"
            icon="el-icon-close"
          >未解决</el-link>
          | <el-link
            v-if="!this.problemIsStar"
            type="primary"
            icon="el-icon-star-off"
          >点击收藏</el-link>
          <el-link
            v-else
            icon="el-icon-star-on"
          >已收藏</el-link>
          | <el-link
            type="warning"
            v-if="this.dataProblemDetail.ptype===1"
          > 本地判题</el-link>
        </div>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">题目描述</div>
          <div
            class="detail-card-body"
            v-html="this.dataProblemMain.dis?this.dataProblemMain.dis:'没有描述'"
          ></div>
        </el-card>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">输入</div>
          <div
            class="detail-card-body"
            v-html="this.dataProblemMain.input?this.dataProblemMain.input:'没有输入'"
          ></div>
        </el-card>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">输出</div>
          <div
            class="detail-card-body"
            v-html="this.dataProblemMain.output?this.dataProblemMain.output:'没有输出'"
          ></div>
        </el-card>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">输入样例</div>
          <div
            class="detail-card-body"
            v-html="this.dataProblemSamples.input?this.dataProblemSamples.input:'没有输入样例'"
          ></div>
        </el-card>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">输出样例</div>
          <div
            class="detail-card-body"
            v-html="this.dataProblemSamples.output?this.dataProblemSamples.output:'没有输出样例'"
          ></div>
        </el-card>
        <el-card
          id="problem"
          class="problem-detail-card"
        >
          <div slot="header">题目统计信息
            <el-link
              type="info"
              class="elcard-showmore-link"
            >查看详细</el-link>
          </div>
          <div class="detail-card-body">
            <span>总AC数：{{this.dataProblemDetail.totalAc}}</span>
            <span>通过人数：{{this.dataProblemDetail.totalAcUser}}</span>
            <span>尝试人数：{{this.dataProblemDetail.totalSubmitUser}}</span>
            <span>总提交量：{{this.dataProblemDetail.totalSubmit}}</span>
            <span>AC率：{{this.dataProblemDetail.strRadio}}</span>
          </div>
        </el-card>
      </el-scrollbar>
    </div>

    <div class="right-box">
      <br />
      <div class="code-editor-box">
        请选择语言：
        <el-select
          class="language-select"
          size="medium"
          v-model="compileLanguage"
          @change="this.handleChangeLanguage"
          :disabled="!this.$store.getters.getIsLogin"
        >
          <el-option
            v-for="item in languageType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <aceEditor
          class="code-editor"
          :language="this.compileLanguage"
          :readOnly="!this.$store.getters.getIsLogin"
          @input="getCode"
        ></aceEditor>
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="!this.$store.getters.getIsLogin"
        >提交代码</el-button>
      </div>

    </div>
    <!-- <div class="code-box"><aceEditor language="CPP"></aceEditor></div> -->
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
      dataProblemMain: '',
      dataProblemDetail: '',
      dataProblemSamples: {
        pid: '',
        id: '',
        input: '',
        output: ''
      },
      problemIsAc: false,
      problemIsStar: false,
      code: '',
      compileLanguage: 'G++',
      languageType: [
        {
          value: 'G++',
          label: 'G++'
        },
        {
          value: 'GCC',
          label: 'GCC'
        },
        {
          value: 'JAVA',
          label: 'JAVA'
        },
        {
          value: 'Python',
          label: 'Python2'
        }
      ]
    }
  },
  mounted () {
    this.getProblem()
    if (!this.$store.getters.getIsLogin) {
      this.$notify({
        title: '提示',
        message: '登录后才能作答哦',
        type: 'warning',
        offset: 100,
        duration: 3000
      })
    }
  },
  methods: {
    async getProblem () {
      let params = new URLSearchParams()
      params.append('pid', this.$route.query.pid ? this.$route.query.pid : '')
      params.append('username', this.$store.getters.getUsername)
      let dataProblemView = await this.$http
        .post('/problemview/getProblemView', params)
        .catch(() => {
          // this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.dataProblemMain = dataProblemView.datas[0]
      this.dataProblemDetail = dataProblemView.datas[1]
      this.dataProblemSamples = dataProblemView.datas[2] ? dataProblemView.datas[2] : this.dataProblemSamples
      this.problemIsAc = dataProblemView.datas[3]
    },
    async onSubmit () {
      if (this.code.length > 50) {
        let params = new URLSearchParams()
        params.append('pid', this.$route.query.pid)
        params.append('user', this.$store.getters.getUsername)
        params.append('code', this.code)
        params.append('language', this.compileLanguage)
        // FIXME: 暂时固定时间和内存限制
        params.append('timeLimit', 1000)
        params.append('memoryLimit', 128000)
        // 如果有本地判题标记，优先提交到本地
        let url = ''
        if (this.dataProblemDetail.ptype === 1) {
          url = '/submit/submitProblemToLocal'
        } else {
          url = '/submit/submitProblem'
        }
        let dataSubmitProblem = await this.$http
          .post(url, params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
          })
        this.logger.i(dataSubmitProblem.datas)
        this.$router.push({ path: '/Status' })
      } else {
        this.$message({ message: '提交长度过少！', type: 'error' })
      }
    },
    getCode (code) {
      this.code = code
    },
    handleSubmit () {
      this.onSubmit()
    },
    handleChangeLanguage (val) {
      this.compileLanguage = val
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Status') {
      to.meta.keepAlive = false
    }
    next()
  }

}
</script>

<style scoped>
.submit-body {
  width: 95%;
  margin: auto;
  margin-top: 0px;
  min-height: 700px;
  font-size: 15px;
}

.left-box {
  float: left;
  text-align: left;
  width: 50%;
  height: 680px;
  margin-bottom: 30px;
}

.right-box {
  float: right;
  width: 49%;
  min-height: 700px;
}

/* .code-editor-box {
} */

.language-select {
  margin-bottom: 10px;
  width: 20%;
  margin-right: 2%;
  z-index: 1;
}

.code-editor {
  width: 100%;
  margin-bottom: 10px;
}

.title-box {
  width: 100%;
  min-height: 120px;
  text-align: center;
}

.title-font {
  font-size: 31px;
}

.el-tag {
  font-size: 14px;
  margin-right: 20px;
  margin-left: 5px;
}

.problem-detail-card {
  margin-bottom: 20px;
  margin-right: 14px;
}

.detail-card-body {
  font-size: 16px;
  margin: 0;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
