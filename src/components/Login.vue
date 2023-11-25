<template>
  <div>
    <el-dialog :visible.sync="dialog" title="登录">
      <el-form :model="form" style="width: 500px">
        <el-form-item label="请输入用户名:" label-width="120px">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码:" label-width="120px">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exit2">取消</el-button>
        <el-button @click="load">重置</el-button>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      dialog: true,
      registerLoad: false,
      form: {
        username: '',
        password: ''
      },
      emit: {
        username: '',
        password: '',
        login: false
      }
    }
  },
  methods: {
    load(){
      this.form.username=''
      this.form.password=''
    },
    login(){
      this.$http.get(this.$ajax+':6203/find?username='+this.form.username+'&password='+this.form.password).then(resp=>{
        if(resp.data.password===this.form.password){
          this.emit.login=true
          this.emit.username=this.form.username
          this.emit.password=this.form.password
        }
        this.$emit('transfer',this.emit)
      })
    },
    register(){
      this.$emit('register',true)
    },
    exit2(){
      this.$emit('exit',false)
    }
  }
}
</script>

<style scoped>

</style>
