<template>
  <div class="message-box">
    <el-card :body-style="{ padding: '0px' }" class="message-box-card">
      <div slot="header" class="clearfix">
        <span>系统消息</span>
      </div>
      <div class="functionBar">
        <el-pagination
          class="bar-pagination"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="getUserMessage"
          :total="Total"
        ></el-pagination>
        <el-table :data="this.tableData" highlight-current-row="true">
          <el-table-column type="index" :index="indexChange" label="#" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope">
              <div v-if="'已读'===scope.row.status" class="table-row-readed">{{scope.row.status}}</div>
              <div v-else class="table-row-unread">{{scope.row.status}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="200"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showText(scope.row)">查看</el-button>
              <el-button type="danger" size="mini" @click="delMessage(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      Total: 0,
      pagesize: 10,
      tableData: []
    }
  },
  methods: {
    async getUserMessage (pagenum) {
      this.logger.ms('getUserMessage', '获取当前页的用户消息列表')
      this.tableData = []
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      this.currentPage = pagenum
      // this.logger.f(pagenum)
      params.append('username', username)
      params.append('pagenum', pagenum)
      let dataMessage = await this.$http
        .post('/message/getUserMessage', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          this.logger.e('获取消息列表失败')
        })
      let dataTempMessage = dataMessage.datas[0]
      this.Total = dataMessage.datas[1]
      for (let i = 0; i < dataTempMessage.length; i++) {
        let localeTime = new Date(dataTempMessage[i].time).toLocaleString()
        let status = (dataTempMessage[i].status === 1) ? '已读' : '未读'
        this.tableData.push({
          mid: dataTempMessage[i].mid,
          status: status,
          title: dataTempMessage[i].title,
          text: dataTempMessage[i].text,
          time: localeTime
        })
      }
      this.logger.me('getUserMessage', '获取当前页的用户消息列表')
    },
    indexChange (index) {
      return (this.currentPage - 1) * 10 + index + 1
    },
    showText (row) {
      this.logger.ms('showText', '显示详情')
      this.$alert(row.text, '查看系统消息', {
        dangerouslyUseHTMLString: true,
        callback: action => {
          if (row.status === '未读') {
            this.logger.i('未读设置已读')
            this.setReaded(row.mid)
            row.status = '已读'
          }
        }
      })
      this.logger.me('showText', '显示详情')
    },
    delMessage (row) {
      this.logger.ms('delMessage', '删除消息记录')
      this.$confirm('你确定要删除这条记录吗？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.delMessageByMid(row.mid)
        })
        .catch(() => {})
    },
    async setReaded (mid) {
      let params = new URLSearchParams()
      params.append('mid', mid)
      let dataSetReaded = await this.$http
        .post('/message/setReadedByMid', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          this.logger.e('请求失败')
        })
      if (dataSetReaded.code === 100) {
        this.logger.i('设置 mid: ' + mid + ' 已读成功')
      } else {
        this.logger.e('设置 mid: ' + mid + ' 已读失败')
      }
    },
    async delMessageByMid (mid) {
      let params = new URLSearchParams()
      params.append('mid', mid)
      let dataSetReaded = await this.$http
        .post('/message/delMessageByMid', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          this.logger.e('请求失败')
        })
      if (dataSetReaded.code === 100) {
        this.logger.i('删除成功！')
        this.$message({message: '删除成功!', type: 'success'})
        this.getUserMessage(this.currentPage)
      } else {
        this.logger.e('删除失败！')
      }
    }
  },
  mounted () {
    this.getUserMessage(this.currentPage)
  }
}
</script>

<style scoped>
.message-box {
  margin: 2% 5% 2% 5%;
  width: 90%;
  min-height: 680px;
  padding: 0;
}

.message-box-card {
  width: 90%;
  height: 100%;
  min-height: 680px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  margin-top: 2%;
  margin-bottom: 2%;
  /* background-color: #eeeeee; */
}

.clearfix {
  margin: 0px;
  padding: 0px;
  /* background-color: #eeeeee; */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.functionBar {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px;
  border-bottom: 1px solid silver;
}

.bar-pagination{
  float: right;
}

.table-row-readed {
  color: green;
  font-weight: bold;
}

.table-row-unread {
  color: red;
  font-weight: bold;
}
</style>
