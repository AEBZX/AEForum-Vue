<template>
  <div>
    <el-container>
      <el-header>
        <el-input v-model="search" style="width: 300px" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
      </el-header>
      <el-main>
        <el-table :data="list">
          <el-table-column prop="title"></el-table-column>
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
  name: 'Search',
  data(){
    return{
      search: '',
      list: []
    }
  },
  methods: {
    query(){
      this.$http.get(this.$ajax+':6205/findByTitle/'+this.search).then(resp=>{
        this.list=resp.data
      })
    },
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
  }
}
</script>

<style scoped>
.el-input{
  text-align: center;
}

</style>
