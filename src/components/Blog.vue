<template>
  <div>
    <el-container style="height: 1001px;background-color: #d9d9d9">
      <el-header>
        <el-container>
          <el-aside>
            <el-avatar :size="60" :src="blogImage" @error="errorHandler">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <el-button type="text" @click="redirect">{{write.username}}</el-button>
          </el-aside>
          <el-main>
            <h1>{{list.title}}</h1>
          </el-main>
        </el-container>
      </el-header>
      <el-main style="background-color: #eeeeee;height: 1000px">
        <div v-html="list.text"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data(){
    return{
      list: {},
      write: {},
      blogImage: '',
      comment: '',
      commentList: [],
      trueList: []
    }
  },
  methods: {
    go(){
      this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
      this.$passKey)).then(resp=>{
        var a={
          writer: resp.data.id,
          label: this.$filter.holdDirty(this.comment),
          blog: this.$route.params.id
        }
        this.$http.post(this.$ajax+':6206/',a).then(res=>{
          window.location.reload()
        })
      })
    },
    redirect(){
      this.$router.push(this.el('/user/'+this.write.id))
    },
    logging(value){
      return value === 'true';
    },
    el(url){
      if(this.logging(this.$route.query.login)){
        return url+'?username='+this.$route.query.username+'&password='+this.$route.query.password+'&logging=false'+
          '&register=false&login=true'
      }else{
        return url+'?logging=false&register=false&login=false'
      }
    },
    errorHandler() {
      return true;
    }
  },
  created() {
    this.$http.get(this.$ajax+':6205/'+this.$route.params.id).then(resp=>{
      this.list=resp.data
      document.title=resp.data.title
      this.$http.get(this.$ajax+':6203/'+resp.data.writeId).then(res=>{
        this.write=res.data
        this.$http.get(this.$ajax+':6204/'+res.data.image,{
          responseType: 'blob'
        }).then(re=>{
          let blob = new window.Blob([re.data]);
          let url = window.URL.createObjectURL(blob);
          this.blogImage = url;
        })
      })
    })
  }
}
</script>

<style scoped>

</style>
