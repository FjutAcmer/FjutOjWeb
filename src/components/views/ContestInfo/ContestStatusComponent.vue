<template>
  <div class="problem">
    <div class="problem-filter">
      <el-row type="flex">
        <el-col :span="1">
          <el-button icon="el-icon-refresh" size="mini" type="primary" @click="handleSearch"></el-button>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入用户"
            v-model="searchNick"
            size="mini"
          >
            <template slot="prepend">用户</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入内容"
            v-model="searchPid"
            size="mini"
          >
            <template slot="prepend">题号</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            placeholder="请选择结果"
            size="mini"
            v-model="searchResult"
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
        <!-- <el-col :span="4">
          <el-select
            placeholder="请选择语言"
            size="mini"
            v-model="searchLang"
            @change="langChange"
          >
            <el-option
              v-for="item in langList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col> -->
        <el-col :span="1.5">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch()"
          >筛选</el-button>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      style="float:left"
      layout="total, prev, pager, next, jumper"
      :current-page="currentPage"
      @current-change="switchPage"
      :total="currentTotal"
      :page-size="30"
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
        width="200"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"

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

          >{{scope.row.pid}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="评测结果"
        width="200"
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
        width="150"
      ></el-table-column>
      <el-table-column
        prop="memoryUsed"
        label="使用内存"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="codelen"
        label="代码长"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交时间"
      >
        <template slot-scope="scope">
          <span>{{new Date(scope.row.submitTime).toLocaleString(
            'chinese',
            { hour12: false }
          )}}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    cid: String
  },
  data () {
    return {
      loading: true,
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      searchNick: '',
      searchPid: '',
      isSearch: false,
      searchResult: -1,
      result: 'All',
      searchLang: -1,
      lang: 'All',
      resultList: [
        { id: -1, name: 'All' },
        { id: 0, name: 'Pendding...' },
        { id: 1, name: 'Accepted' },
        { id: 2, name: 'Wrong Answer' },
        { id: 3, name: 'Compilation Error' },
        { id: 4, name: 'Runtime Error' },
        { id: 5, name: 'Time Limit Exceeded' },
        { id: 6, name: 'Memory Limit Exceeded' },
        { id: 7, name: 'Output Limit Exceeded' },
        { id: 8, name: 'Presentation Error' },
        { id: 9, name: 'System Error' },
        { id: 10, name: 'Running......' },
        { id: 11, name: 'Submit Error' },
        { id: 12, name: 'Judging...' },
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
    async getStatus () {
      this.tableData = []
      this.loading = true
      let params = new URLSearchParams()
      params.append('pageNum', this.currentPage)
      params.append('cid', this.cid)
      params.append('nick', this.searchNick)
      params.append('pid', this.searchPid)
      params.append('result', this.searchResult)
      let dataAllStatus = await this.$http
        .get('/contest/getContestStatusByPage', params)
        .catch(() => {
          this.loading = false
        })
      this.loading = false
      this.tableData = dataAllStatus.datas[0]
      this.currentTotal = dataAllStatus.datas[1]
    },
    handleSearch () {
      this.currentPage = 1
      this.getStatus()
    },
    toCodeView (row) {
      // this.$router.push({path: '/CodeView', query: {id: row.id}})
      // 解构赋值，将this.$router.resolve对象内的href 返回给 href
      let { href } = this.$router.resolve({
        name: 'CodeView',
        query: {
          id: row.id,
          ruser: row.ruser
        }
      })
      window.open(href, '_blank')
    },
    switchPage (val) {
      this.currentPage = val
      this.getStatus()
    },
    resultChange (val) {
      let obj = {}
      obj = this.resultList.find(item => {
        return item.id === val
      })
      this.result = obj.name
      this.searchResult = val
    },
    langChange (val) {
      let obj = {}
      obj = this.langList.find(item => {
        return item.id === val
      })
      this.lang = obj.name
      this.searchLang = val
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
