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
        本站大数据
      </div>
      <!--  -->
      <!-- <iframe
        src="http://www.baidu.com"
        width="100%"
        height="600px;"
        frameborder="0"
        name="iframe名称"
        scrolling="yes"
      >
      </iframe> -->
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        常用文件下载中心
      </div>
      <el-collapse
        id="download-file"
        v-model="defopen"
      >
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
      defopen: ['1', '2', '3']
    }
  },
  mounted () {
    this.getInfo()
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
  width: 100%;
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
</style>
