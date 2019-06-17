<template>
  <div class="message-box">
    <el-card :body-style="{ padding: '0px' }" class="message-box-card">
      <div slot="header" class="clearfix">
        <span>系统消息</span>
      </div>
      <div class="functionBar">
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="getUserMessage"
          :total="Total"
        ></el-pagination>
        <el-table style="height:700px;" :data="this.tableData">
          <el-table-column type="index" :index="indexChange" label="#" ></el-table-column>
          <el-table-column prop="status" label="已读" ></el-table-column>
          <el-table-column prop="time" label="时间" ></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">查看</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="text" label="内容">
            <template slot-scope="scope">
              <div v-html="scope.row.text"></div>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      Total: 0,
      pagesize: 10,
      tableData: []
    };
  },
  methods: {
    async getUserMessage(pagenum) {
      this.tableData = [];
      let params = new URLSearchParams();
      let username = this.$store.getters.getUsername;
      this.currentPage = pagenum;
      // this.logger.f(pagenum);
      params.append("username", username);
      params.append("pagenum", pagenum);
      let dataMessage = await this.$http
        .post("/message/getUserMessage", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
          this.logger.e("获取消息列表失败");
        });
      let dataTempMessage = dataMessage.datas[0];
      this.Total = dataMessage.datas[1];
      for (let i = 0; i < dataTempMessage.length; i++) {
        let localeTime = new Date(dataTempMessage[i].time).toLocaleString();
        let status = 1 === dataTempMessage[i].status ? "已读" : "未读";
        this.tableData.push({
          mid: dataTempMessage[i].mid,
          status: status,
          title: dataTempMessage[i].title,
          time: localeTime
        });
      }
    },
    indexChange(index) {
      return (this.currentPage - 1) * 10 + index + 1;
    }
  },
  mounted() {
    this.getUserMessage(this.currentPage);
  }
};
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
</style>
