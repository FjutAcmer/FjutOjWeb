<template>
    <div class="docker">
        <el-card :body-style="{ padding: '0px' }" class="head-card">
            <span class="head-span">
                <span style="color:green">problem:</span> &nbsp;{{problem}}&nbsp;&nbsp;&nbsp;
                <span style="color:green">jadgeStatu:</span> &nbsp;{{jadgeStatu}}&nbsp;&nbsp;&nbsp;
                <span style="color:green">runId:</span> &nbsp;{{runId}}&nbsp;&nbsp;&nbsp;
                <span style="color:green">languge:</span> &nbsp;{{languge}}&nbsp;&nbsp;&nbsp;
                <span style="color:green">author:</span> &nbsp;{{author}}
            </span>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" class="box-card">
            <span style="float:left">
                <pre style="text-align:left;font-size:20px;margin:10px 10px 10px 10px;padding-right:10px" v-html="code"></pre>
            </span>
        </el-card>
    </div>
</template>
<script>
import {getUser} from '../../api'

export default {
    data(){
        return {
            code:'',
            problem:'',
            jadgeStatu:'',
            runId:'',
            languge:'',
            author:''
        }
    },
    methods:{
        async getCode(){
            let params = new URLSearchParams();
            params.append("id",this.$route.query.id);
            params.append("user",sessionStorage.getItem("username"));
            let {data} = await getUser().post('/status/GStatusCode',params).catch(()=>{
                    this.$message({message: '服务器繁忙，请稍后再试！',type: 'error'});
                    return;
            });
            this.code = data.data[0];
            this.author = this.$route.query.ruser;
            this.runId = this.$route.query.id;
            this.problem = this.$route.query.problem;
            this.jadgeStatu = this.$route.query.jadgeStatu;
            this.languge = this.$route.query.languge;
        }
    },
    mounted(){
        this.getCode();
    }
}
</script>
<style scoped>
.docker{
    width:100%;
    margin:0;
    padding:0;
    min-height: 100%;
}

.box-card {
    width: 86%;
    min-height: 600px;
    display: block;
    margin-left: 7%;
    margin-right:7%; 
    margin-bottom: 2%;
    margin-top:2%;
    padding: 0;
}

.head-card {
    width: 86%;
    height: 70px;
    display: block;
    margin-left: 7%;
    margin-right:7%; 
    margin-bottom: 2%;
    margin-top:2%;
    padding: 0;
    background-color:beige;
}

.head-span{
    font-size: 20px;
    line-height: 70px;
}
</style>
