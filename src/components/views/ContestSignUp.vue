<template>
  <div class="contestSignUp">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div class="contestSignUp-head">
        <div style="float:left">报名列表</div>
        <el-button size="mini" @click="addContestUser" style="float:right;margin-right:2%">报名</el-button>
      </div>
      <div class="contestSignUp-info">
        <!-- <h5>【报名已经结束】</h5> -->
        <!-- <h5>【总报名人数：】</h5>
        <h5>【审核通过人数：】</h5>-->
        <!-- <h5>【报名时间：】</h5> -->
      </div>
      <el-pagination
        style="float:left;margin-left:2%"
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="getContestUsers"
        :total="this.currentTotal*10"
      ></el-pagination>
      <!-- <el-table style="width:100%;" :data="this.tableData" v-if="ctype==1">
                    <el-table-column prop="id" label="用户名" style="width:10%"></el-table-column>
                    <el-table-column prop="Title" label="队名" style="width:10%"><template slot-scope="scope"><div @click="toSubmit(scope.row)">{{scope.row.Title}}</div> </template></el-table-column>
                    <el-table-column prop="Ratio" label="队员1" style="width:10%"></el-table-column>
                    <el-table-column prop="Ratio" label="队员2" style="width:10%"></el-table-column>
                    <el-table-column prop="Ratio" label="队员3" style="width:10%"></el-table-column>
                    <el-table-column prop="Ratio" label="状态" style="width:10%"></el-table-column>
                    <el-table-column prop="Ratio" label="时间" style="width:10%"></el-table-column>
                    <el-table-column prop="Ratio" label="账号" style="width:10%"  v-if="isadmin"></el-table-column>
                    <el-table-column prop="Ratio" label="密码" style="width:10%"  v-if="isadmin"></el-table-column>
                    <el-table-column fixed="right" label="admin" width="200" v-if="isadmin">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                等待
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                通过
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                拒绝
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                非正式
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                需修改
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                已签到
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
      </el-table>-->
      <el-table style="width:100%;" :data="this.tableData">
        <el-table-column prop="username" label="用户名" style="width:10%"></el-table-column>
        <el-table-column prop="name" label="姓名" style="width:5%"></el-table-column>
        <el-table-column prop="gender" label="性别" style="width:5%">
          <template slot-scope="scope">
            <span v-if="scope.row.gender===0">未知</span>
            <span v-if="scope.row.gender===1">男性</span>
            <span v-if="scope.row.gender===2">女性</span>
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校" style="width:10%"></el-table-column>
        <el-table-column prop="faculty" label="学院" style="width:10%"></el-table-column>
        <el-table-column prop="major" label="专业" style="width:5%"></el-table-column>
        <el-table-column prop="cla" label="班级" style="width:5%"></el-table-column>
        <el-table-column prop="no" label="学号" style="width:10%"></el-table-column>
        <el-table-column prop="nick" label="昵称" style="width:10%"></el-table-column>
        <el-table-column prop="rating" label="Rating" style="width:5%"></el-table-column>
        <!-- <el-table-column prop="statu" label="状态" style="width:5%"></el-table-column> -->
        <el-table-column prop="time" label="时间" style="width:15%"></el-table-column>
        <!-- <el-table-column fixed="right" label="admin" width="200" v-if="isadmin">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                等待
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                通过
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                拒绝
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                非正式
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                需修改
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                已签到
                            </el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                删除
                            </el-button>
                        </template>
        </el-table-column>-->
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // ctype:2,
      isadmin: true,
      tableData: [],
      currentPage: 1,
      currentTotal: 0
    };
  },
  methods: {
    async getContestUsers(val) {
      this.tableData = [];
      let params = new URLSearchParams();
      params.append("cid", this.$route.query.cid);
      params.append("pagenum", val);
      this.currentPage = val;
      let dataContestUsers = await this.$http
        .post("/GContestUsers", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.currentTotal = dataContestUsers.data[0];
      this.tableData = dataContestUsers.data[1];
      // console.log(this.tableData);
    },
    async addContestUser() {
      let params = new URLSearchParams();
      params.append("cid", this.$route.query.cid);
      params.append("username", sessionStorage.getItem("username"));
      let dataContestuser = await this.$http
        .post("/IContestuser", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.$message({ message: dataContestuser.data[0], type: "success" });
    }
  },
  mounted() {
    this.getContestUsers(this.currentPage);
  }
};
</script>
<style scoped>
.contestSignUp {
  width: 90%;
  min-height: 700px;
  margin: 2% 5% 2% 5%;
}

.box-card {
  width: 100%;
  height: 100%;
  min-height: 700px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.contestSignUp-head {
  background-color: #f5f5f5;
  height: 20px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
}

.contestSignUp-info {
  width: 100%;
  display: inline-flex;
  margin-left: 2%;
  float: left;
}
</style>
