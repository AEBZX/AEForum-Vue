<template>
  <div>
    <el-container style="height: 100%" v-if="see">
      <el-aside width="401px" style="height: 100%">
        <div class="block">
          <img :src="SRC" height="400" width="400" style="border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;">
          <img>
        </div>
      </el-aside>
      <el-main>
        <p>用户名:{{this.$pass.decryptDes(this.$route.query.username,this.$passKey)}}</p>
        <p>密码:{{this.$pass.decryptDes(this.$route.query.password,this.$passKey)}}</p>
        <el-input type="textarea" placeholder="输入你的个性签名" style="width: 300px" v-model="DETAILS" autosize>
        </el-input>
        <br/>
        <el-button @click="onclick" type="primary">保存</el-button>
      </el-main>
    </el-container>
    <el-empty description="您尚未登录" v-if="!see"></el-empty>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data(){
    return{
      see: false,
      DETAILS: '',
      SRC: ''
    }
  },
  methods: {
    onclick(){
      var a=this.$filter.holdDirty(this.DETAILS)
      this.$http.patch(this.$ajax+':6203/details/'+this.$pass.decryptDes(this.$route.query.username,
      this.$passKey)+'/'+a).then(resp=>{
        this.$message({
          type: 'success',
          message: '已保存修改',
          showClose: true
        })
      })
    }
  },
  created() {
    this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
    this.$passKey)).then(resp=>{
      if(resp.data.image!==null){
        this.$http.get(this.$ajax+':6204/'+resp.data.image,{
          responseType: 'blob'
        }).then(res=>{
          let blob = new window.Blob([res.data]);
          let url = window.URL.createObjectURL(blob);
          this.SRC = url;
        })
      }else{
        this.SRC='https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
      }
      if(resp.data.details!==null){
        this.DETAILS=resp.data.details
      }
    })
    if(this.$route.query.login==='true'){
      this.see=true
    }
  }
}
</script>

<style scoped>

</style>
