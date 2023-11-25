<template>
  <div>
    <el-dialog title="注册" :visible.sync="dialogR">
      <el-form :model="register" style="width: 500px">
        <el-form-item label="请输入用户名:" label-width="120px">
          <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码:" label-width="120px">
          <el-input v-model="register.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="请输入邮箱:" label-width="120px">
          <el-input v-model="register.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码:" label-width="120px" v-if="have">
          <el-input v-model="register.pass" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label-width="120px">
          <el-checkbox v-model="boolean">我已阅读并同意<el-button type="text" @click="text=true">用户协议
          </el-button></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exit1">取消</el-button>
        <el-button @click="loading">重置</el-button>
        <el-button @click="loads">获取验证码</el-button>
        <el-button type="primary" @click="click" :disabled="!boolean">注册</el-button>
        <el-button type="primary" @click="RLogin">登录</el-button>
      </div>
      <el-dialog :visible.sync="text" title="用户协议" append-to-body>
        <p>您在使用本服务时需遵守法律法规，社会主义制度，国家利益，公民合法权利，社会公共秩序，道德风尚及信息真实性等“七条底线“要求。</p>
        <p>除非法律允许或本网站的书面许可，您使用本网站过程中不得删除本网站及其副本上关于知识产权的信息，不得对本网站进行反向工程等或以其他
          方式尝试发现本软件的源代码。</p>
        <p>您在本网站的昵称/文章/评论中出现的敏感词都会被替换为“*”</p>
        <p>您在本网站发布的任何言论所造成的负面影响均与本网站无关，请您自行承担后果</p>
        <p>您充分了解并同意，您必须为自己注册账号下的一切行为负责。</p>
        <p>您登录/注册本网站即视为您已阅读并同意接受本网站协议的约束。本网站有权在必要时修改本协议条款。如果您不接受修改后的条款，应当停止使用本网站</p>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
      dialogR: true,
      have: false,
      boolean: false,
      text: false,
      register: {
        username: '',
        password: '',
        mail: '',
        pass: ''
      },
      pass: ''
    }
  },
  methods: {
    click(){
      if(this.have===true){
        if(this.register.pass===this.pass){
          var a=true
          this.$http.get(this.$ajax+':6203/findByUsername/'+this.register.username).then(resp=>{
            if(resp.data.username===this.register.username){
              a=false
              this.$message(
                {
                  showClose: true,
                  message: '用户名已存在',
                  type: 'warning'
                }
              )
            }else{
              a=true
            }
          })
          if(a===true){
            this.form.username=this.$filter.holdDirty(this.form.username)
            var b={
              username: this.register.username,
              password: this.register.password,
              mail: this.register.mail
            }
            this.$http.post(this.$ajax+':6203/',b).then(resp=>{
              var a={
                follow: resp.data.id,
                followYou: resp.data.id
              }
              this.$http.post(this.$ajax+':6202/',a)
              this.$message(
                {
                  showClose: true,
                  message: '注册成功',
                  type: 'success'
                }
              )
              this.$emit('creating',false)
            })
          }
        }else{
          this.$message(
            {
              showClose: true,
              message: '验证码错误',
              type: 'error'
            }
          )
        }
      }else{
        this.$message(
          {
            showClose: true,
            message: '请先获取验证码',
            type: 'error'
          }
        )
      }
    },
    loading(){
      this.form.username=''
      this.form.password=''
      this.mail=''
      this.pass=''
    },
    loads(){
      var a=''+Math.floor(Math.random()*(999999-1000+1))
      this.$http.get(this.$ajax+':6203/sender?to='+this.register.mail+'&text=验证码:'+a+',请确定为您本人操作,请勿告知他人')
        .then(resp=>{
        this.pass=a
        this.have=true
        this.$message({
          showClose: true,
          message: '验证码已发送',
          type: 'success'
        })
      })
    },
    exit1(){
      this.$emit('exit',false)
    },
    RLogin(){
      this.$emit('login',true)
    }
  }
}
</script>

<style scoped>

</style>
