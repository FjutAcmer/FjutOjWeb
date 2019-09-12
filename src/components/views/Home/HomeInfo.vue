<template>
  <div class="home-info-body">
    <el-card class="box-card">
      <div slot="header">
        公告栏
      </div>
      <div v-html="message"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        个性化
      </div>
      <div v-if="this.$store.getters.getIsLogin && loaded">
        <span class="info-font">亲爱的 {{this.$store.getters.getUsername}}，根据我们的预测，您可能会对以下题目感兴趣，要不要试试？</span>
        <br />
        <el-link
          type="primary"
          @click="toSubmit(recommendProblems[0].pid)"
        >#{{recommendProblems[0].pid}} {{recommendProblems[0].title}} </el-link><br />
        <el-link
          type="primary"
          @click="toSubmit(recommendProblems[1].pid)"
        >#{{recommendProblems[1].pid}} {{recommendProblems[1].title}} </el-link><br />
        <el-link
          type="primary"
          @click="toSubmit(recommendProblems[2].pid)"
        >#{{recommendProblems[2].pid}} {{recommendProblems[2].title}} </el-link><br />
        <el-link
          class="info-font"
          @click="getRecommendProblems()"
        >
          <el-icon class="el-icon-refresh"></el-icon>不喜欢？点我换一波
        </el-link>
      </div>
      <div v-else><span class="info-font">登录后查看哦</span></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        常用文件下载中心
      </div>
      <el-collapse id="download-file">
        <el-collapse-item name="1">
          <template slot="title">
            <div>浏览器</div>
          </template>
          <div>
            <el-tag type="danger">
              <el-link
                href="https://www.google.cn/chrome/"
                target="_blank"
                :underline="false"
                type="danger"
              >谷歌浏览器</el-link>
            </el-tag>
            <el-tag type="warning">
              <el-link
                href="https://www.firefox.com.cn/"
                target="_blank"
                :underline="false"
                type="warning"
              >火狐浏览器</el-link>
            </el-tag>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div>集成开发环境（IDE）</div>
          </template>
          <div>
            <el-tag type="success">
              <el-link
                href="http://www.codeblocks.org/"
                target="_blank"
                :underline="false"
                type="success"
              >Code::Blocks</el-link>
            </el-tag>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div>其他</div>
          </template>
          <div>
            <el-tag>
              <el-link
                href="http://120.78.128.11/file/jihehuaban.zip"
                target="_blank"
                :underline="false"
                type="primary"
              >几何画板</el-link>
            </el-tag>
            <el-tag type="info">
              <el-link
                href="http://120.78.128.11/file/upload/20160818/1471501247639019014.zip"
                target="_blank"
                :underline="false"
              >卡西欧计算器</el-link>
            </el-tag>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- <el-card class="box-card"></el-card> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      loaded: false,
      recommendProblems: []
    }
  },
  created () {

  },
  mounted () {
    this.getInfo()
    this.getRecommendProblems()
  },
  methods: {
    async getInfo () {
      let params = new URLSearchParams()
      params.append('key', 'indexNotify')
      let dataNotify = await this.$http.get('/system/getSystemValue', params)
      if (dataNotify.code === 100) {
        this.message = dataNotify.datas[0].value
      } else {
        this.message = '公告获取失败哦'
      }
    },
    async getRecommendProblems () {
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      let dataRecommend = await this.$http.get('/problem/getRecommendProblems', params)
      this.recommendProblems = dataRecommend.datas[0]
      this.loaded = true
    },
    toSubmit (pid) {
      this.$router.push({ path: '/Submit', query: { pid: pid } })
    }
  }
}
</script>

<style scoped>
.home-info-body {
  padding: 0;
  width: 100%;
  margin: 0;
}

.box-card {
  min-height: 200px;
  margin-bottom: 20px;
}

.showmore-link {
  float: right;
  font-size: 14px;
}

.el-tag {
  margin-right: 14px;
}

.info-font {
  font-size: 16px;
  line-height: 28px;
}
</style>
