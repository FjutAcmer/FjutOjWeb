<template>
  <div class="body">
    <div class="left-body">
      标题：
      <el-input
        placeholder="请输入标题"
        style="width:380px"
        v-model="problemTitle"
        size="medium"
      ></el-input>
      <br /> <br />
      时间限制（MS）：
      <el-input
        placeholder="请输入时间限制（MS）"
        style="width:300px"
        v-model="timeLimit"
        size="medium"
      ></el-input>
      <br /> <br />
      空间限制（MB）：
      <el-input
        placeholder="请输入空间限制（MB）"
        style="width:300px"
        v-model="memoryLimit"
        size="medium"
      ></el-input>
      <br /> <br />
      作者：
      <el-input
        placeholder="可以为空"
        style="width:380px"
        v-model="memoryLimit"
        size="medium"
      ></el-input>
      <br /><br />
      <el-checkbox
        v-model="spj"
        size="medium"
      >是否特判</el-checkbox>
    </div>
    <div class="right-body">
      <el-button
        type="warning"
        @click="getLocalJudgeProblemFileList"
      >检测本地题库</el-button>
      <el-button
        type="danger"
        @click="resetLocalJudgeMarker"
        >重置本地题库标识</el-button>
      <div>
        <el-pagination
          class="table-pagination"
          layout="total, prev, pager, next"
          :total="tableData.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <div class="search-bar">
          <el-input
            style="width:100px;"
            size="mini"
            v-model="searchProblemName"
          ></el-input>
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleTableSearch"
          >查找</el-button>
        </div>

      </div>

      <el-table
        :data="tableData.slice((currentPage-1) * pageSize, currentPage * pageSize)"
        height="400"
        v-loading="this.loading"
      >
        <el-table-column
          label="题号"
          prop="problemName"
        ></el-table-column>
        <el-table-column label="输入文件"><template slot-scope="scope">
            <pre>{{scope.row.inputFiles}}</pre>
          </template></el-table-column>
        <el-table-column label="输出文件"><template slot-scope="scope">
            <pre>{{scope.row.outputFiles}}</pre>
          </template></el-table-column>
        <el-table-column label="特判文件"><template slot-scope="scope">
            <pre>{{scope.row.spjFiles}}</pre>
          </template></el-table-column>
        <el-table-column label="其他"><template slot-scope="scope">
            <pre>{{scope.row.otherFiles}}</pre>
          </template></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      problemTitle: '',
      timeLimit: '',
      memoryLimit: '',
      spj: false,
      searchProblemName: '',
      tableData: '',
      pageSize: 30,
      currentPage: 1,
      dataFileListDetail: '',
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleTableSearch () {
      this.tableData = []
      for (let i = 0; i < this.dataFileListDetail.length; i++) {
        if (this.dataFileListDetail[i].problemName.indexOf(this.searchProblemName) >= 0) {
          this.tableData.push(this.dataFileListDetail[i])
        }
      }
    },
    async getLocalJudgeProblemFileList () {
      this.loading = true
      let params = new URLSearchParams()
      let dataFileList = await this.$http
        .get('/file/getLocalJudgeFile', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataFileList.code === 100) {
        this.dataFileListDetail = dataFileList.datas[0]
        this.tableData = this.dataFileListDetail
      } else {
        this.$message.error(dataFileList.msg)
      }
      this.loading = false
    },
    resetLocalJudgeMarker () {

    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 400px;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.left-body {
  float: left;
  min-height: 400px;
  width: 40%;
}

.right-body {
  float: right;
  min-height: 400px;
  width: 60%;
}

.table-pagination {
  float: left;
}

.search-bar {
  float: right;
}

.pre {
  margin: 0;
  padding: 0;
}
</style>>
