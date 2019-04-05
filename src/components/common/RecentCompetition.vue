<template>
    <div class="recent-competition">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float:left">最近比赛</span>
                <el-button style="float: right; padding: 3px 0" type="text">—></el-button>
            </div>
            <el-table style="width: 100%">
                <el-table-column prop="id" label="#" width="180"></el-table-column>
                <el-table-column prop="name" label="名称" width="180"></el-table-column>
                <el-table-column prop="start-date" label="开始时间"></el-table-column>
                <el-table-column prop="end-date" label="结束时间"></el-table-column>
                <el-table-column prop="authority" label="权限"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.recent-competition{
    padding:0;
    margin:0;
}

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 810px;
    height: 150px;
  }
</style>
