<template>
  <div>
    <el-container style="height: 100%">
      <el-aside>
        <el-avatar :size="60" :src="path" @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </el-aside>
      <el-main>
        <el-upload
          class="avatar-uploader"
          action="AAA"
          :http-request="upload"
          :show-file-list="false">
          <div class="el-upload__text">
            将图像文件拖到此处，或
            <em>点击选取</em>
          </div>
        </el-upload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Image',
  data(){
    return{
      path: ''
    }
  },
  methods: {
    errorHandler(){
      return true
    },
    upload(param){
      this.$http.post(this.$ajax+':6204',{
        file: param.file
      },{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(resp=>{
        var fileId=resp.data.id
        this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
        this.$passKey)).then(res=>{
          var id=res.data.id
          this.$http.patch(this.$ajax+':6203/'+id+'/'+fileId).then(response=>{
            window.location.reload()
            this.$message.success('头像设置成功')
          })
        })
      })
    }
  },
  created() {
    this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,this.$passKey))
    .then(resp=>{
      if(resp.data.image!==null){
        this.$http.get(this.$ajax+':6204/'+resp.data.image,{responseType: 'blob'}).then(resp=>{
          let blob = new window.Blob([resp.data]);
          let url = window.URL.createObjectURL(blob);
          this.path = url;
        })
      }
    })
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
