<template>
<!-- TODO: add by axiang [20190702] 交互很难看，需要重新设计 -->
  <div class="docker">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <div class="discuss-head">
        <div style="float:left">讨论</div>
      </div>
      <div class="functionBar">
        <el-pagination
          style="float:left"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="getList"
          :total="this.currentTotal*10"
        ></el-pagination>
        <el-button
          v-if="isLogin"
          style="float:right;margin-right:10px;margin-top:10px"
          @click="newDiscuss"
          size="mini"
        >新建帖子</el-button>

        <el-button class="button" size="mini" @click="getSearch(1)">确定</el-button>
        <el-input v-model="input" placeholder="title" size="mini" class="input">
          <template slot="prepend">查找</template>
        </el-input>
      </div>
      <el-table
        style="width:100%;"
        :data="this.tableData"
        highlight-current-row
        v-loading="loading"
      >
        <el-table-column prop="discussid" label="#" width="300"></el-table-column>
        <el-table-column label="标题" width="500">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:blue" @click="toChat(scope.row)">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="发布时间" width="300"></el-table-column>
        <el-table-column label="发布人">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:blue" @click="toUser(scope.row)">{{scope.row.author}}</div>
          </template>
        </el-table-column>
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
        .post('/discuss/GDiscuss', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.loading = false
      this.currentTotal = dataDiscuss.data[0]
      // console.log(this.currentTotal)
      this.tableData = dataDiscuss.data[1]
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
        let dataDiscussByTitle = await this.$http
          .post('/discuss/GDiscussByTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
          })
        this.loading = false
        this.currentTotal = dataDiscussByTitle.data[0]
        // console.log(this.currentTotal)
        this.tableData = dataDiscussByTitle.data[1]
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
        .post('/discuss/insertDiscuss', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.$message({ message: dataInsertDiscuss.data[0], type: 'success' })
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
    this.getLoginStatu()
    this.getDiscuss(this.currentPage)
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
  width: 90%;
  margin: 2% 5% 2% 5%;
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
