<template>
  <div class="message-box">
    <el-card :body-style="{ padding: '0px' }" class="message-box-card">
      <div slot="header" class="clearfix">
        <span>系统消息</span>
      </div>
      <div class="functionBar">
        <el-pagination
          class="bar-pagination"
          layout="total, prev, pager, next, jumper"
          :current-page="currentPage"
          @current-change="getList"
          :total="Total"
        ></el-pagination>
        <el-button
          class="button-readAll"
          type="primary"
          size="medium"
          plain
          @click="handleUnReadMessage"
          v-if="!isSearch"
        >查看未读</el-button>
        <el-button
          class="button-readAll"
          type="info"
          size="medium"
          plain
          @click="handleBackToList"
          v-else
        >查看全部</el-button>
        <el-button
          class="button-readAll"
          type="warning"
          size="medium"
          plain
          @click="handleAllMessageRead"
        >全部已读</el-button>
        <el-table :data="this.tableData" max-height="600" v-loading="loading">
          <el-table-column type="index" :index="indexChange" label="#" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <div :class="('已读'===scope.row.status)?'table-row-readed':'table-row-unread'">{{scope.row.status}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="240"></el-table-column>
          <el-table-column prop="title" label="标题" width="500">
            <template slot-scope="scope">
              <el-link type="info" @click="showText(scope.row)">
                <strong>{{scope.row.title}}</strong>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
      tableData: [],
      isSearch: false,
      loading: false
    }
  },
  computed: {
    isAllReaded () {
      if (this.$store.getters.getUnReadMsgCount > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getList (val) {
      if (this.isSearch) {
        this.getUserUnReadMessage(val)
        this.loading = false
      } else {
        this.getUserMessage(val)
      }
    },
    indexChange (index) {
      return (this.currentPage - 1) * 10 + index + 1
    },
    showText (row) {
      this.logger.ms(this.showText.name, '')
      this.$alert(row.text, '查看系统消息', {
        dangerouslyUseHTMLString: true,
        callback: action => {
          if (row.status === '未读') {
            this.logger.i('未读设置已读')
            this.setReaded(row.mid)
            row.status = '已读'
            this.$store.commit(
              'setUnReadMsgCount',
              this.$store.getters.getUnReadMsgCount - 1
            )
          }
        }
      })
      this.logger.me(this.showText.name, '')
    },
    delMessage (row) {
      this.logger.ms('delMessage', '删除消息记录')
      this.$confirm('你确定要删除这条记录吗？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.delMessageByMid(row.mid)
      })
    },
    handleAllMessageRead () {
      let unReadMsgCount = this.$store.getters.getUnReadMsgCount
      if (unReadMsgCount > 0) {
        this.$confirm('你确定要设置全部已读吗？可能会错过重要消息', '警告', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.setMessageAllRead()
        })
      } else {
        this.$message({ message: '已经全部已读！', type: 'warning' })
      }
    },

    // add by axiang [20190628] 对筛选状态进行了固定
    handleUnReadMessage () {
      if (!this.isSearch) {
        this.currentPage = 1
      }
      this.isSearch = true
      this.getUserUnReadMessage(this.currentPage)
    },
    // add by axiang [20190628] 返回到全部内容列表
    handleBackToList () {
      this.isSearch = false
      this.getUserMessage(1)
    },
    async getUserMessage (pagenum) {
      this.loading = true
      this.logger.ms(this.getUserMessage.name, '')
      this.tableData = []
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      this.currentPage = pagenum
      params.append('username', username)
      params.append('pagenum', pagenum)
      let dataMessage = await this.$http
        .get('/message/getUserMessage', params)
      let dataTempMessage = dataMessage.datas[0]
      this.Total = dataMessage.datas[1]
      if (typeof dataTempMessage !== 'undefined') {
        for (let i = 0; i < dataTempMessage.length; i++) {
          let localeTime = new Date(dataTempMessage[i].time).toLocaleString(
            'chinese',
            { hour12: false }
          )
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
        this.$message.warning('没有系统消息')
      }
      this.logger.me(this.getUserMessage.name, '')
      this.loading = false
    },
    async getUserUnReadMessage (pagenum) {
      this.loading = true
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      this.currentPage = pagenum
      params.append('username', username)
      params.append('pagenum', pagenum)
      let dataUnReadMessage = await this.$http
        .get('/message/getUnReadMessage', params)
        .catch(() => {
          this.logger.e('获取消息列表失败')
        })
      let dataTempUnReadMessage = dataUnReadMessage.datas[0]
      this.Total = dataUnReadMessage.datas[1]
      this.tableData = []
      if (typeof dataTempUnReadMessage !== 'undefined') {
        for (let i = 0; i < dataTempUnReadMessage.length; i++) {
          let localeTime = new Date(
            dataTempUnReadMessage[i].time
          ).toLocaleString('chinese', { hour12: false })
          let status = dataTempUnReadMessage[i].status === 1 ? '已读' : '未读'
          this.tableData.push({
            mid: dataTempUnReadMessage[i].mid,
            status: status,
            title: dataTempUnReadMessage[i].title,
            text: dataTempUnReadMessage[i].text,
            time: localeTime
          })
        }
      } else {
        this.$message({ message: '没有未读消息', type: 'warning' })
      }
      this.loading = false
    },
    async setReaded (mid) {
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      params.append('mid', mid)
      let dataSetReaded = await this.$http
        .post('/message/setReaded', params)
        .catch(() => {
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
      params.append('username', this.$store.getters.getUsername)
      params.append('mid', mid)
      let dataSetReaded = await this.$http
        .post('/message/delMessage', params)
        .catch(() => {
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
      params.append('username', this.$store.getters.getUsername)
      params.append('username', username)
      let dataSetMsgAllRead = await this.$http
        .post('/message/setAllMessageRead', params)
        .catch(() => {
          this.logger.e('请求失败')
        })
      if (dataSetMsgAllRead.code === 100) {
        this.$message({ message: '设置全部消息已读成功', type: 'success' })
        this.logger.i(
          '设置全部消息已读成功! 设置成功条数：' + dataSetMsgAllRead.datas[0]
        )
        this.$store.commit('setUnReadMsgCount', 0)
        this.getList(this.currentPage)
      } else {
        this.$message({ message: '消息已经全部已读', type: 'warning' })
        this.logger.w(
          '设置全部消息已读失败！设置成功条数：' + dataSetMsgAllRead.datas[0]
        )
      }
    },
    async setUnReadMsgCount () {
      this.logger.ms('UnReadMsgCount', '未读消息数量')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUnReadMsgCount = await this.$http
        .get('/message/getUnReadMessageCount', params)
        .catch(() => {
          this.logger.e('请求签到信息失败')
        })
      if (dataUnReadMsgCount.code === 100) {
        let unReadMsgCount = dataUnReadMsgCount.datas[0]
        this.$store.commit('setUnReadMsgCount', unReadMsgCount)
      }
      this.logger.me('UnReadMsgCount', '未读消息数量')
    }
  },
  mounted () {
    if (this.isSearch) {
      this.getUserUnReadMessage(this.currentPage)
    } else {
      this.getUserMessage(this.currentPage)
    }
    this.setUnReadMsgCount()
  }
}
</script>

<style scoped>

.message-box {
  margin: 2% 10% 2% 10%;
  width: 80%;
  min-height: 700px;
  padding: 0;
}

.message-box-card {
  width: 90%;
  height: 100%;
  min-height: 700px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  margin-top: 2%;
  margin-bottom: 2%;
}

.clearfix {
  margin: 0px;
  padding: 0px;

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
  margin-top: 10px;
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
