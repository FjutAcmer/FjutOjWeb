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
        <!-- <el-button
          class="button-readAll"
          type="danger"
          size="medium"
          plain
          @click="handleDelAllMessage"
        >清空消息</el-button> -->
        <el-button
          class="button-readAll"
          type="warning"
          size="medium"
          plain
          @click="handleAllMessageRead"
        >全部已读</el-button>
        <el-table :data="this.tableData" highlight-current-row>
          <el-table-column type="index" :index="indexChange" label="#" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <div v-if="'已读'===scope.row.status" class="table-row-readed">{{scope.row.status}}</div>
              <div v-else class="table-row-unread">{{scope.row.status}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="240"></el-table-column>
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <el-link type="info" @click="showText(scope.row)">
                <strong>{{scope.row.title}}</strong>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click="">查看</el-button> -->
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
    handleAllMessageRead () {
      this.$confirm('你确定要设置全部已读吗？可能会错过重要消息', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.setMessageAllRead()
      })
    },
    // handleDelAllMessage () {
    //   this.$confirm('你确定要清空你的消息列表吗？这个操作不能恢复', '警告', {
    //     cancelButtonText: '取消',
    //     confirmButtonText: '确定',
    //     type: 'warning'
    //   }).then(() => {
    //     this.delAllMessage()
    //   })
    // },
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

      if (typeof dataTempMessage !== 'undefined') {
        for (let i = 0; i < dataTempMessage.length; i++) {
          let localeTime = new Date(dataTempMessage[i].time).toLocaleString()
          let status = dataTempMessage[i].status === 1 ? '已读' : '未读'
          this.tableData.push({
            mid: dataTempMessage[i].mid,
            status: status,
            title: dataTempMessage[i].title,
            text: dataTempMessage[i].text,
            time: localeTime
          })
        }
      } else {
        this.$message({ message: '没有系统消息', type: 'warning' })
      }
      this.logger.me('getUserMessage', '获取当前页的用户消息列表')
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
        this.$message({ message: '删除成功!', type: 'success' })
        this.getUserMessage(this.currentPage)
      } else {
        this.logger.e('删除失败！')
      }
    },
    async setMessageAllRead () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataSetMsgAllRead = await this.$http
        .post('/message/setAllMessageReadByUser', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          this.logger.e('请求失败')
        })
      if (dataSetMsgAllRead.code === 100) {
        this.$message({ message: '设置全部消息已读成功', type: 'success' })
        this.logger.i(
          '设置全部消息已读成功! 设置成功条数：' + dataSetMsgAllRead.datas[0]
        )
        this.getUserMessage(this.currentPage)
      } else {
        this.$message({ message: '消息已经全部已读', type: 'warning' })
        this.logger.w(
          '设置全部消息已读失败！设置成功条数：' + dataSetMsgAllRead.datas[0]
        )
      }
    }
    // FIXME: 这里与服务端交互失败，需要修改
    // async delAllMessage () {
    //   let username = this.$store.getters.getUsername
    //   this.logger.i(username)
    //   let params = new URLSearchParams()
    //   params.append('username', username)
    //   let dataDelAllMsg = await this.$http
    //     .post('/message/delAllMessageByUser', params)
    //     .catch(() => {
    //       this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
    //       this.logger.e('请求失败')
    //     })
    //   if (dataDelAllMsg.code === 100) {
    //     this.$message({ message: '消息已清空！', type: 'success' })
    //     this.logger.i('消息已清空！ 删除条数：' + dataDelAllMsg.datas[0])
    //     this.getUserMessage(this.currentPage)
    //   } else {
    //     this.$message({ message: '消息列表为空！', type: 'warning' })
    //     this.logger.w('消息清空失败！ 删除条数：' + dataDelAllMsg.datas[0])
    //   }
    // }
  },
  mounted () {
    this.getUserMessage(this.currentPage)
  }
}
</script>

<style scoped>
.message-box {
  margin: 2% 10% 2% 10%;
  width: 80%;
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

.bar-pagination {
  float: left;
}

.button-readAll {
  margin-top: 10px;
  margin-right: 10px;
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
