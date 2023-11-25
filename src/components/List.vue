<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button type="text" @click="redirect(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  data(){
    return{
      id: 0,
      list: []
    }
  },
  methods: {
    redirect(id) {
      this.$router.push(this.el('/blog/'+id))
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
      this.id=resp.data.id
      this.$http.get(this.$ajax+':6205/findByWrite/'+resp.data.id).then(res=>{
        this.list=res.data
      })
    })
  }
}
</script>

<style scoped>

</style>
