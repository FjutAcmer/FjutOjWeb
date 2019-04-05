<template>
    <div class="problem">
        <el-card :body-style="{ padding: '0px' }" class="box-card">
            <div class="problem-head">
                <div style="float:left">题目列表</div>
            </div>
            <div class="problem-filter">
                <el-row :align="middle" type="flex">
                    <el-col :span="1.5">
                        <el-checkbox>我的收藏</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-input placeholder="请输入内容" size="mini">
                            <template slot="prepend">标题</template>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-select placeholder="请选择标签" size="mini">
                        </el-select>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button icon="el-icon-search" type="primary" size="mini">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-pagination style="float:left" layout="prev, pager, next" :total="1000"></el-pagination>
            <el-table style="width:100%;">
                    <el-table-column prop="id" label="#" style="width:20%"></el-table-column>
                    <el-table-column prop="Title" label="Title" style="width:40%"></el-table-column>
                    <el-table-column prop="Ratio" label="Ratio" style="width:40%"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.problem{
    width: 100%;
    height: 700px;
    padding-top: 5%;
    margin: 0;
    display: block;
    font-family:  微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box-card {
    width: 70%;
    height: 450px;
    display: block;
    margin-left: auto;
    margin-right:auto; 
    padding: 0;
  }
  
.problem-head{
    background-color:#f5f5f5;
    height: 20px;
    width: 100%;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 15px;
    display: block;
}

.problem-filter{
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
