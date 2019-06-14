<template>
  <div class="problem">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <div class="problem-head">
        <div style="float:left">评测列表</div>
      </div>
      <div class="problem-filter">
        <el-row type="flex">
          <el-col :span="4">
            <el-input placeholder="请输入用户" v-model="username" size="mini">
              <template slot="prepend">用户</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入内容" v-model="pid" size="mini">
              <template slot="prepend">题号</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select placeholder="请选择结果" size="mini" v-model="resultValue" @change="resultChange">
              <el-option
                v-for="item in resultList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select placeholder="请选择语言" size="mini" v-model="langValue" @change="langChange">
              <el-option
                v-for="item in langList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="1.5">
            <el-button icon="el-icon-search" type="primary" size="mini" @click="getSearch(1)">筛选</el-button>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        style="float:left"
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="getList"
        :total="currentTotal*10"
      ></el-pagination>
      <el-table style="width:100%;" :data="this.tableData" v-loading="loading">
        <el-table-column prop="id" label="#" width="100"></el-table-column>
        <el-table-column label="昵称" width="140">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:blue" @click="toUser(scope.row)">{{scope.row.ruser}}</div>
          </template>
        </el-table-column>
        <el-table-column label="题目" width="100">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:blue" @click="toSubmit(scope.row)">{{scope.row.pid}}</div>
          </template>
        </el-table-column>
        <el-table-column label="评测结果" width="200">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              type="success"
              v-show="scope.row.result==1"
            >{{ scope.row.otherinfo }}</el-tag>
            <el-tag
              size="medium"
              v-show="scope.row.result==0||scope.row.result==10||scope.row.result==12||scope.row.result==13"
            >{{ scope.row.otherinfo }}</el-tag>
            <el-tag
              size="medium"
              @click="getInfo(scope.row)"
              type="danger"
              style="cursor:pointer;"
              v-show="scope.row.result==2||scope.row.result==3||scope.row.result==4||scope.row.result==5
                            ||scope.row.result==6||scope.row.result==7||scope.row.result==8||scope.row.result==11"
            >{{ scope.row.otherinfo }}</el-tag>
            <el-tag
              size="medium"
              type="warning"
              v-show="scope.row.result==9"
            >{{ scope.row.otherinfo }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="语言" width="150">
          <template slot-scope="scope">
            <div
              @click="toCodeView(scope.row)"
              style="cursor:pointer;color:blue"
            >{{scope.row.submitlanguage}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="timeUsed" label="耗时" width="150"></el-table-column>
        <el-table-column prop="memoryUsed" label="使用内存" width="150"></el-table-column>
        <el-table-column prop="codelen" label="代码长" width="150"></el-table-column>
        <el-table-column prop="submitTime" label="提交时间" width="300"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      username: "",
      pid: "",
      isSearch: false,
      resultValue: 0,
      result: "All",
      langValue: 0,
      lang: "All",
      resultList: [
        { id: 0, name: "All" },
        { id: 1, name: "Accepted" },
        { id: 2, name: "Compilation Error" },
        { id: 3, name: "System Error" },
        { id: 4, name: "Memory Limit Exceeded" },
        { id: 5, name: "Output Limit Exceeded" },
        { id: 6, name: "Presentation Error" },
        { id: 7, name: "Pendding..." },
        { id: 8, name: "Judging..." },
        { id: 9, name: "Runtime Error" },
        { id: 10, name: "Running......" },
        { id: 11, name: "Time Limit Exceeded" },
        { id: 12, name: "Wrong Answer" },
        { id: 13, name: "Score" }
      ],
      langList: [
        { id: 0, name: "All" },
        { id: 1, name: "G++" },
        { id: 2, name: "GCC" },
        { id: 3, name: "JAVA" },
        { id: 4, name: "Python3" },
        { id: 5, name: "G++11" },
        { id: 6, name: "GCC11" },
        { id: 7, name: "VC++" },
        { id: 8, name: "C#" },
        { id: 9, name: "GO 1.8" },
        { id: 10, name: "JavaScript" },
        { id: 11, name: "Pascal" }
      ]
    };
  },
  methods: {
    async getStatus(val) {
      this.tableData = [];
      this.loading = true;
      let params = new URLSearchParams();
      params.append("pagenum", val);
      this.currentPage = val;
      let dataAllStatus = await this.$http
        .post("/status/GAllStatus", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.loading = false;
      this.tableData = dataAllStatus.data[1];
      this.currentTotal = dataAllStatus.data[0];
      // console.log(this.tableData);
    },
    async getSearch(val) {
      // if(this.username!==null||this.pid!==null){
      this.tableData = [];
      this.isSearch = true;
      let params = new URLSearchParams();
      params.append("pagenum", val);
      params.append("ruser", this.username);
      params.append("pid", this.pid);
      params.append("result", this.result);
      params.append("lang", this.lang);
      this.currentPage = val;
      let dataStatusByConditions = await this.$http
        .post("/status/GStatusByConditions", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
          return;
        });
      this.loading = false;
      this.tableData = dataStatusByConditions.data[1];
      this.currentTotal = dataStatusByConditions.data[0];
      // }
    },
    toSubmit(row) {
      // console.log(row.id);
      this.$router.push({ path: "/Submit", query: { pid: row.pid } });
    },
    toUser(row) {
      this.$router.push({ path: "/User", query: { username: row.ruser } });
    },
    toCodeView(row) {
      // console.log(row.id);
      let { href } = this.$router.resolve({
        name: "CodeView",
        query: {
          id: row.id,
          ruser: row.ruser,
          problem: row.pid,
          languge: row.submitlanguage,
          jadgeStatu: row.otherinfo
        }
      });
      window.open(href, "_blank");
    },
    async getInfo(row) {
      let params = new URLSearchParams();
      params.append("rid", row.id);
      let dataCeinfo = await this.$http
        .post("/ceinfo/GCeinfo", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
          return;
        });
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          "rid:" + dataCeinfo.data[0].rid + "  info:" + dataCeinfo.data[0].info,
        showClose: true,
        duration: 0
      });
    },
    getList(val) {
      if (this.isSearch) {
        this.loading = true;
        this.getSearch(val);
      } else {
        this.loading = false;
        this.getStatus(val);
      }
    },
    resultChange(val) {
      let obj = {};
      obj = this.resultList.find(item => {
        return item.id === val;
      });
      this.result = obj.name;
      this.resultValue = val;
    },
    langChange(val) {
      let obj = {};
      obj = this.langList.find(item => {
        return item.id === val;
      });
      this.lang = obj.name;
      this.langValue = val;
    }
  },
  mounted() {
    // var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    // this.timer = setInterval(() => {
    // _this.getStatus(this.currentPage); // 修改数据date
    // }, 1000)
    this.getStatus(this.currentPage);
  },
  computed: {
    filter_data() {
      return;
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
  }
};
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

.box-card {
  width: 86%;
  min-height: 450px;
  display: block;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 2%;
  padding: 0;
}

.problem-head {
  background-color: #f5f5f5;
  height: 20px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
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

