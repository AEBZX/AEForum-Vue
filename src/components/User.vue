<template>
  <div>
    <el-container>
      <el-aside style="width: 401px">
        <img :src="image" width="400" height="400" style="
          border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        ">
      </el-aside>
      <el-main>
        <h1>用户名:{{List.username}}</h1>
        <h1>个性签名:</h1>
        <p>{{details()}}</p>
        <el-button v-if="see" style="width: 30%" :disabled="!follow" type="primary" @click="followThis(click)">
          {{followText}}</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'User',
  data(){
    return{
      List: {},
      image: '',
      logging: false,
      username: '',
      password: '',
      follow: true,
      followText: '关注',
      see: true,
      click: false,
      number: 0
    }
  },
  methods: {
    details(){
      if(this.List.details===null){
        return '这个人什么也没有留下'
      }else{
        return this.List.details
      }
    },
    followThis(type){
      if(type===false){
        this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
          this.$passKey)).then(resp=>{
          var a={
            follow: this.List.id,
            followYou: resp.data.id
          }
          this.$http.post(this.$ajax+':6202/',a).then(res=>{
            this.$message.success('关注成功')
            window.location.reload()
          })
        })
      }
      if(type===true){
        this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
        this.$passKey)).then(resp=>{
          this.$http.get(this.$ajax+':6202/find/'+this.$route.params.id+'/'+resp.data.id).then(res=>{
            this.$http.delete(this.$ajax+':6202/'+res.data.id).then(re=>{
              this.$message.success('取关成功')
              window.location.reload()
            })
          })
        })
      }
    }
  },
  created() {
    this.$http.get(this.$ajax+':6203/'+this.$route.params.id).then(resp=>{
      this.List=resp.data
      if(resp.data.image!==null){
        this.$http.get(this.$ajax+':6204/'+resp.data.image,{responseType: 'blob'}).then(res=>{
          let blob = new window.Blob([res.data]);
          let url = window.URL.createObjectURL(blob);
          this.image = url;
        })
      }else{
        this.image='https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
      }
    })
    if(this.$route.query.login==='true'){
      this.logging=true
      this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
      this.$passKey)).then(resp=>{
        var a=resp.data
        if(this.$route.params.id===''+resp.data.id){
          this.see=false
        }
        this.$http.get(this.$ajax+':6202/you/'+resp.data.id).then(res=>{
          for(var i=0;i<res.data.length;i++){
            if(''+res.data[i].follow===this.$route.params.id){
              this.click=true
              this.followText='取消关注'
            }
          }
        })
      })
    }else{
      this.follow=!this.follow
      this.followText='您未登录'
    }
  }
}
</script>

<style scoped>

</style>
