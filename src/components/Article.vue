<template>
  <div>
    <el-container style="height: 801px; border: 1px solid #eee">
      <el-aside>
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
          <el-menu router>
            <el-menu-item :index="el('/article/new')">创建文章</el-menu-item>
            <el-menu-item :index="el('/article/list')">发表过的文章</el-menu-item>
          </el-menu>
        </el-aside>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data(){
    return{
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>
