<template>
    <div class="docker">
        <el-card :body-style="{ padding: '0px' }" class="box-card">
            <div slot="header" class="clearfix">用户排名</div>
            <div class="functionBar">
                <el-pagination class="pagination" layout="prev, pager, next" :current-page="currentPage" @current-change="getList" :total="this.currentTotal*10"></el-pagination>
                <el-button class="button" size="mini" @click="getSearch(1)">确定</el-button>
                <el-input v-model="input" placeholder="Username" size="mini" class="input">
                    <template slot="prepend">查找</template>
                </el-input>
            </div>
            <el-table style="width:100%;" :data="this.tableData" highlight-current-row v-loading="loading">
                <el-table-column type="index" label="Rank" width="100" :index="indexMethod">Rank</el-table-column>
                <el-table-column label="UserName" width="200">
                    <template slot-scope="scope">
                        <div @click="toUser(scope.row)" v-if="scope.row.acnum>=0&&scope.row.acnum<=100" style="cursor:pointer;color:gray">{{scope.row.username}}</div> 
                        <div @click="toUser(scope.row)" v-if="scope.row.acnum>=100&&scope.row.acnum<=500" style="cursor:pointer;color:blue">{{scope.row.username}}</div> 
                        <div @click="toUser(scope.row)" v-if="scope.row.acnum>=500&&scope.row.acnum<=700" style="cursor:pointer;color:purple">{{scope.row.username}}</div> 
                        <div @click="toUser(scope.row)" v-if="scope.row.acnum>=700&&scope.row.acnum<=1000" style="cursor:pointer;color:#FF6A6A">{{scope.row.username}}</div> 
                        <div @click="toUser(scope.row)" v-if="scope.row.acnum>=1000" style="cursor:pointer;color:orange">{{scope.row.username}}</div> 
                    </template>
                </el-table-column>
                <el-table-column label="Nick" width="220">
                    <template slot-scope="scope">
                        <div v-if="scope.row.acnum>=0&&scope.row.acnum<=100" style="color:gray">{{scope.row.nick}}</div> 
                        <div v-if="scope.row.acnum>=100&&scope.row.acnum<=500" style="color:blue">{{scope.row.nick}}</div> 
                        <div v-if="scope.row.acnum>=500&&scope.row.acnum<=700" style="color:purple">{{scope.row.nick}}</div> 
                        <div v-if="scope.row.acnum>=700&&scope.row.acnum<=1000" style="color:#FF6A6A">{{scope.row.nick}}</div> 
                        <div v-if="scope.row.acnum>=1000" style="color:orange">{{scope.row.nick}}</div> 
                    </template>
                </el-table-column>
                <el-table-column prop="motto" label="Motto" width="500"></el-table-column>
                <el-table-column label="AC">
                    <template slot-scope="scope">
                        <div v-if="scope.row.acnum>=0&&scope.row.acnum<=100" style="color:gray">{{scope.row.acnum}}</div> 
                        <div v-if="scope.row.acnum>=100&&scope.row.acnum<=500" style="color:blue">{{scope.row.acnum}}</div> 
                        <div v-if="scope.row.acnum>=500&&scope.row.acnum<=700" style="color:purple">{{scope.row.acnum}}</div> 
                        <div v-if="scope.row.acnum>=700&&scope.row.acnum<=1000" style="color:#FF6A6A">{{scope.row.acnum}}</div> 
                        <div v-if="scope.row.acnum>=1000" style="color:orange">{{scope.row.acnum}}</div> 
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import {getUser} from '../../api'

export default {
    data(){
        return {
            loading:'',
            input:'',
            Rank:0,
            currentPage: 1,
            currentTotal: 0,
            tableData: [],
            isSearch:false
        }
    },
    mounted(){
        this.getAcRank(this.currentPage);
    },
    methods:{
        async getAcRank(val){
            this.tableData = [];
            this.loading = true;
            let params = new URLSearchParams();
            params.append('pagenum',val);
            this.currentPage = val;
            let {data} = await getUser().post('/rank/GUserRank',params).catch(()=>{
                this.$message({message: '服务器繁忙，请稍后再试！',type: 'error'});
            });
            this.loading = false;
            this.currentTotal = data.data[0];
            // console.log(this.currentTotal);
            this.tableData = data.data[1];
            this.Rank=0;
        },
        async getSearch(val){
            if(this.input!==null){
                this.loading = true;
                this.currentPage = val
                this.isSearch = true;
                let params = new URLSearchParams();
                params.append('username',this.input);
                params.append('pagenum',this.currentPage);
                let {data} = await getUser().post('/rank/GUserRankByName',params).catch(()=>{
                    this.$message({message: '服务器繁忙，请稍后再试！',type: 'error'});
                    return;
                });
                this.loading = false;
                this.tableData = [];
                this.currentTotal = data.data[0];
                this.tableData = data.data[1];
            }
        },
        getList(val){
            if(this.isSearch){
                this.getSearch(val);
            }else{
                this.getAcRank(val);
            }
        },
        indexMethod(index) {
            return index + (this.currentPage-1)*50+1;
        },
        toUser(row){
            this.$router.push({ path: '/User', query: { username: row.username }});
        }
    }
}
</script>
<style scoped>
.docker{
    margin: 0;
    padding: 0;
    width:100%;
    min-height: 700px;
}

.box-card {
    width: 90%;
    height: 100%;
    min-height:500px;
    display: block;
    margin-left: auto;
    margin-right:auto; 
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
    clear: both
}

.functionBar{
    width: 100%;
    margin:0;
    padding:0;
    height: 50px;
    border-bottom: 1px solid silver;
}

.pagination{
    float:left;
    margin-left:10px;
    height: 30px;
    margin-top:10px;
}

.input{
    float: right;
    margin-right: 10px;
    margin-top:10px;
    height: 30px;
    width: 200px;
}

.button{
    float: right;
    margin-right: 10px;
    margin-top:10px;
    height: 30px;
    width:50px;
}
</style>
