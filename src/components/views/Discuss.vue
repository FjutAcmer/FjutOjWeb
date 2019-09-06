<template>
  <!-- TODO: add by axiang [20190702] 交互很难看，需要重新设计 -->
  <div class="docker">
    <el-card class="box-card">
      <div slot="header">讨论区</div>
      <div class="functionBar">
        <el-pagination
          style="float:left"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="getList"
          :total="this.currentTotal*10"
        ></el-pagination>
        <!-- <el-button
          v-if="isLogin"
          style="float:right;margin-right:10px;margin-top:10px"
          @click="newDiscuss"
          size="mini"
        >新建帖子</el-button> -->

        <!-- <el-button
          class="button"
          size="mini"
          @click="getSearch(1)"
        >确定</el-button> -->
        <!-- <el-input
          v-model="input"
          placeholder="title"
          size="mini"
          class="input"
        >
          <template slot="prepend">查找</template>
        </el-input> -->
      </div>
      <el-table
        style="width:100%;"
        :data="this.tableData"
        highlight-current-row
        v-loading="loading"
      >
        <el-table-column
          prop="discussid"
          label="#"
          width="100"
        ></el-table-column>
        <el-table-column
          label="标题"
          width="350"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="toChat(scope.row)"
            >{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
          width="200"
        ></el-table-column>
        <el-table-column
          label="发布人"
          width="200"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="toUser(scope.row)"
            >{{scope.row.author}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="最后回复时间"
          width="200"
        ></el-table-column>
        <el-table-column
          label="最后回复人"
          width="200"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      loading: '',
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      isSearch: false,
      isLogin: false
    }
  },
  methods: {
    async getDiscuss (val) {
      this.tableData = []
      this.loading = true
      let params = new URLSearchParams()
      params.append('pagenum', val)
      this.currentPage = val
      let dataDiscuss = await this.$http
        .get('/discuss/getDiscuss', params)
        .catch(() => { })
      this.loading = false
      this.currentTotal = dataDiscuss.datas[0]
      this.tableData = dataDiscuss.datas[1]
    },
    async getList (val) {
      if (this.isSearch) {
        this.getSearch(val)
      } else {
        this.getDiscuss(val)
      }
    },
    async getSearch (val) {
      if (this.input !== null) {
        this.tableData = []
        this.isSearch = true
        this.loading = true
        let params = new URLSearchParams()
        params.append('pagenum', val)
        params.append('title', this.input)
        this.currentPage = val
        // FIXME: 请求是假的，记得在后端补充
        let dataDiscussByTitle = await this.$http
          .post('/discuss/getDiscussByTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
          })
        this.loading = false
        this.currentTotal = dataDiscussByTitle.datas[0]
        this.tableData = dataDiscussByTitle.datas[1]
      }
    },
    toChat (row) {
      this.$router.push({
        path: 'Chat',
        query: { title: row.title, id: row.discussid }
      })
    },
    toUser (row) {
      this.$router.push({ path: '/User', query: { username: row.author } })
    },
    newDiscuss () {
      this.$prompt('请输入标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.insertDiscuss(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建'
          })
        })
    },
    async insertDiscuss (val) {
      let params = new URLSearchParams()
      params.append('title', val)
      params.append('author', this.$store.getters.getUsername)
      let dataInsertDiscuss = await this.$http
        .post('/discuss/putDiscuss', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.$message({ message: dataInsertDiscuss.msg, type: 'success' })
    },
    getLoginStatu () {
      if (this.$store.getters.getUsername) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  mounted () {
    if (this.$store.getters.getIsLogin) {
      this.getLoginStatu()
      this.getDiscuss(this.currentPage)
    } else {
      this.$notify({
        title: '提示',
        message: '登录后才能查看讨论区哦',
        type: 'warning',
        offset: 100,
        duration: 3000
      })
    }
  }
}
</script>
<style scoped>
.docker {
  width: 100%;
  min-height: 700px;
  margin: 0;
  padding: 0;
}

.box-card {
  min-height: 600px;
  width: 85%;
  margin: auto;
  padding: 0;
}

.discuss-head {
  background-color: #f5f5f5;
  height: 20px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
}
.pagination {
  float: left;
  margin-left: 10px;
  height: 30px;
  margin-top: 10px;
}

.functionBar {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px;
  border-bottom: 1px solid silver;
}

.input {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  height: 30px;
  width: 200px;
}

.button {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  height: 30px;
  width: 50px;
}
</style>
