<template>
  <div>
    <login @transfer="redirect" @register="create" v-if="LR(loginR)" @exit="exitL"></login>
    <register v-if="LR(registerR)" @exit="exitR" @login="goto" @creating="exitRRR"></register>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
        <el-menu class="el-menu-demo" router mode="horizontal">
          <el-menu-item :index="el('/home')" :disabled="!LR(logging)">主页</el-menu-item>
          <el-menu-item :index="el('/manage')">管理</el-menu-item>
          <el-menu-item :index="el('/article')" :disabled="!LR(logging)">文章管理</el-menu-item>
          <el-menu-item :index="el('/follow')" :disabled="!LR(logging)">关注的人</el-menu-item>
          <el-menu-item :index="el('/followYou')" :disabled="!LR(logging)">关注你的人</el-menu-item>
          <el-menu-item :index="el('/image')" :disabled="!LR(logging)">头像设置</el-menu-item>
          <el-menu-item :index="el('/search')">查询文章</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
export default {
  name: 'Index',
  components: {Register, Login},
  data(){
    return{
      logging: 'false',
      registerR: 'false',
      loginR: 'false',
      ps: '',
      um: '',
      msg: {
        username: '',
        password: '',
        login: null
      }
    }
  },
  methods: {
    el(url){
      if(this.logging==='true'){
        return url+'?username='+this.$route.query.username+'&password='+this.$route.query.password+'&logging=false'+
          '&register=false&login=true'
      }else{
        return url+'?logging=false&register=false&login=false'
      }
    },
    redirect(msg){
      this.msg=msg
      this.loginR=false
      if(this.msg.login===true){
        this.$message(
          {
            showClose: true,
            message: '登录成功',
            type: 'success'
          }
        )
        this.$router.push('/?username='+this.$pass.encryptDes(this.msg.username,this.$passKey)+'&password='
          +this.$pass.encryptDes(this.msg.password,this.$passKey)+'&login=true&register=false&logging=false')
      }else{
        this.$message(
          {
            showClose: true,
            message: '登录失败',
            type: 'error'
          }
        )
      }
    },
    create(msg){
      this.registerR=msg
      this.loginR=false
    },
    exitR(msg){
      this.registerR=msg
    },
    exitRRR(msg){
      this.registerR=msg
      this.loginR=true
    },
    exitL(msg){
      this.loginR=msg
    },
    goto(msg){
      this.registerR=false
      this.loginR=msg
    },
    LR(value){
      return value === 'true';
    }
  },
  created() {
    if(this.$route.query.username!==undefined){
      this.ps=this.$pass.decryptDes(this.$route.query.password,this.$passKey)
      this.um=this.$pass.decryptDes(this.$route.query.username,this.$passKey)
      this.logging=true
    }
    if(this.$route.query.register!==undefined){
      this.registerR=this.$route.query.register
    }
    if(this.$route.query.logging!==undefined){
      this.loginR=this.$route.query.logging
    }
    if(this.$route.query.login===undefined || this.$route.query.login==='false'){
      this.logging='false'
    }else{
      this.logging='true'
    }
  }
}
</script>

<style scoped>

</style>
