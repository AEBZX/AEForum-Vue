<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-menu-item :index="el('/manage/details')">个人信息编辑</el-menu-item>
          <el-menu-item :index="el_login('/manage')" v-text="LRText('',true)"></el-menu-item>
          <el-menu-item :index="el_register('/manage')" v-text="LRText('',false)"></el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data(){
    return{
      text: '登录'
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
    },
    el_login(url){
      if(this.logging(this.$route.query.login)){
        return url+'?username='+this.$route.query.username+'&password='+this.$route.query.password+'&logging=true'+
          '&register=false&login=true'
      }else{
        return url+'?logging=true&register=false&login=false'
      }
    },
    el_register(url){
      if(this.logging(this.$route.query.login)){
        return url+'?username='+this.$route.query.username+'&password='+this.$route.query.password+'&logging=false'+
          '&register=true&login=true'
      }else{
        return url+'?logging=false&register=true&login=false'
      }
    },
    LRText(value,item){
      if(item===true){
        if(this.logging(this.$route.query.login)){
          return '切换账户'
        }else{
          return '登录'
        }
      }else{
        if(this.logging(this.$route.query.login)){
          return '注册新账户'
        }else{
          return '注册账户'
        }
      }
    }
  },
  filters: {
  }
}
</script>

<style scoped>

</style>
