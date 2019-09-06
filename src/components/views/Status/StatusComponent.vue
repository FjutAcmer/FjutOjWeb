<template>
  <div class="problem">
    <div class="problem-filter">
      <el-row type="flex">
        <el-col :span="2">
          <el-button icon="el-icon-refresh" size="mini" type="primary" @click="getStatus(1)"></el-button>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入用户"
            v-model="username"
            size="mini"
          >
            <template slot="prepend">用户</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入内容"
            v-model="pid"
            size="mini"
          >
            <template slot="prepend">题号</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            placeholder="请选择结果"
            size="mini"
            v-model="resultValue"
            @change="resultChange"
          >
            <el-option
              v-for="item in resultList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            placeholder="请选择语言"
            size="mini"
            v-model="langValue"
            @change="langChange"
          >
            <el-option
              v-for="item in langList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="1.5">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="getSearch(1)"
          >筛选</el-button>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      style="float:left"
      layout="total, prev, pager, next, jumper"
      :current-page="currentPage"
      @current-change="getList"
      :total="currentTotal*10"
    ></el-pagination>
    <el-table
      style="width:100%;"
      :data="this.tableData"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="#"
        width="100"
      ></el-table-column>
      <el-table-column
        label="昵称"
        width="150"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="toUser(scope.row)"
          >{{scope.row.nick}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="题目"
        width="100"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="toSubmit(scope.row)"
          >{{scope.row.pid}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="评测结果"
        width="180"
      >
        <template slot-scope="scope">
          <el-tag
            size="medium"
            effect="dark"
            type="success"
            v-show="scope.row.result==1"
          >{{ scope.row.otherinfo }}</el-tag>
          <el-tag
            size="medium"
            effect="dark"
            type="warning"
            v-show="scope.row.result==3||scope.row.result==8"
          >{{ scope.row.otherinfo }}</el-tag>
          <el-tag
            size="medium"
            effect="dark"
            v-show="scope.row.result==0||scope.row.result==10||scope.row.result==12||scope.row.result==13"
          >{{ scope.row.otherinfo }}</el-tag>
          <el-tag
            size="medium"
            effect="dark"
            type="danger"
            v-show="scope.row.result==2||scope.row.result==4||scope.row.result==5
                            ||scope.row.result==6||scope.row.result==7||scope.row.result==11"
          >{{ scope.row.otherinfo }}</el-tag>
          <el-tag
            size="medium"
            effect="dark"
            type="warning"
            v-show="scope.row.result==9"
          >{{ scope.row.otherinfo }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="语言"
        width="100"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="toCodeView(scope.row)"
          >{{scope.row.submitlanguage}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeUsed"
        label="耗时"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="memoryUsed"
        label="使用内存"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="codelen"
        label="代码长"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交时间"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{new Date(scope.row.submitTime).toLocaleString(
            'chinese',
            { hour12: false }
          )}}</span></template>
      </el-table-column>
      <el-table-column label="是否赛题"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// FIXME: add by axiang [20190820] 需要重构！改为统一状态搜索，然后改为用户昵称搜索而不是用户名搜索
export default {
  data () {
    return {
      loading: true,
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      username: '',
      pid: '',
      isSearch: false,
      resultValue: 0,
      result: 'All',
      langValue: 0,
      lang: 'All',
      resultList: [
        { id: 0, name: 'All' },
        { id: 1, name: 'Accepted' },
        { id: 2, name: 'Compilation Error' },
        { id: 3, name: 'System Error' },
        { id: 4, name: 'Memory Limit Exceeded' },
        { id: 5, name: 'Output Limit Exceeded' },
        { id: 6, name: 'Presentation Error' },
        { id: 7, name: 'Pendding...' },
        { id: 8, name: 'Judging...' },
        { id: 9, name: 'Runtime Error' },
        { id: 10, name: 'Running......' },
        { id: 11, name: 'Time Limit Exceeded' },
        { id: 12, name: 'Wrong Answer' },
        { id: 13, name: 'Score' }
        // { id: 14, name: 'Submit Error' }
      ],
      langList: [
        { id: 0, name: 'All' },
        { id: 1, name: 'G++' },
        { id: 2, name: 'GCC' },
        { id: 3, name: 'JAVA' },
        { id: 4, name: 'Python2' },
        { id: 5, name: 'G++11' },
        { id: 6, name: 'GCC11' },
        { id: 7, name: 'VC++' },
        { id: 8, name: 'C#' },
        { id: 9, name: 'GO 1.8' },
        { id: 10, name: 'JavaScript' },
        { id: 11, name: 'Pascal' }
      ]
    }
  },
  mounted () {
    this.getStatus(this.currentPage)
  },
  computed: {
  },
  methods: {
    async getStatus (val) {
      this.tableData = []
      this.loading = true
      let params = new URLSearchParams()
      params.append('pageNum', val)
      this.currentPage = val
      let dataAllStatus = await this.$http
        .get('/status/getAllStatusByPage', params)
        .catch(() => {
          this.loading = false
        })
      this.loading = false
      this.tableData = dataAllStatus.datas[1]
      this.currentTotal = dataAllStatus.datas[0]
    },
    async getSearch (val) {
      this.tableData = []
      this.loading = true
      this.isSearch = true
      let params = new URLSearchParams()
      params.append('pagenum', val)
      params.append('ruser', this.username)
      params.append('pid', this.pid)
      params.append('result', this.result)
      params.append('lang', this.lang)
      this.currentPage = val
      let dataStatusByConditions = await this.$http
        .post('/status/GStatusByConditions', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.loading = false
      this.tableData = dataStatusByConditions.datas[1]
      this.currentTotal = dataStatusByConditions.datas[0]
    },
    toSubmit (row) {
      this.$router.push({ path: '/Submit', query: { pid: row.pid } })
    },
    toUser (row) {
      this.$router.push({ path: '/User', query: { username: row.ruser } })
    },
    toCodeView (row) {
      this.$router.push({path: '/CodeView', query: {id: row.id}})
      // // 解构赋值，将this.$router.resolve对象内的href 返回给 href
      // let { href } = this.$router.resolve({
      //   name: 'CodeView',
      //   query: {
      //     id: row.id,
      //     ruser: row.ruser
      //   }
      // })
      // window.open(href, '_blank')
    },
    getList (val) {
      if (this.isSearch) {
        this.loading = true
        this.getSearch(val)
      } else {
        this.loading = false
        this.getStatus(val)
      }
    },
    resultChange (val) {
      let obj = {}
      obj = this.resultList.find(item => {
        return item.id === val
      })
      this.result = obj.name
      this.resultValue = val
    },
    langChange (val) {
      let obj = {}
      obj = this.langList.find(item => {
        return item.id === val
      })
      this.lang = obj.name
      this.langValue = val
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果是点击到代码详情或者题目列表时，离开评测页面时让评测页面缓存
    if (to.name === 'CodeView' || to.name === 'Submit') {
      from.meta.keepAlive = true
    } else {
      // 否则，离开评测页面不缓存
      from.meta.keepAlive = false
    }
    next()
  }
}
</script>

<style scoped>
.problem {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
  display: block;
  font-family: 微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.problem-filter {
  margin: 0;
  padding: 10px 15px;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
  width: 100%;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-input {
  width: 180px;
}
</style>
