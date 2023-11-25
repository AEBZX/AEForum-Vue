<template>
  <div>
    <el-container>
      <el-header>
        <h1>你和你关注的人发布的文章:</h1>
      </el-header>
      <el-main>
        <el-table :data="article">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="text" @click="redirect('/blog/'+scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      article: []
    }
  },
  methods: {
    redirect(msg){
      this.$router.push(this.el(msg))
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
    }
  },
  created() {
    this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
    this.$passKey)).then(resp=>{
      var list1=resp.data
      this.$http.get(this.$ajax+':6202/follow/'+resp.data.id).then(res=>{
        var list2=res.data
        for(var i=0;i<list2.length;i++){
          this.$http.get(this.$ajax+':6205/findByWrite/'+res.data[i].followYou).then(re=>{
            var list3=re.data
            for(var j=0;j<list3.length;j++){
              this.article.push(re.data[j])
            }
          })
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
