<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="primary" @click="newText">插入文本</el-button>
        <el-button type="primary" @click="newImage">插入图片</el-button>
        <el-button type="primary" @click="newLink">插入链接</el-button>
        <el-button @click="deleteText">撤销</el-button>
        <el-button type="primary" @click="go">发表</el-button>
      </el-header>
      <el-main>
        <el-input class="paperview-input-text" v-model="title" placeholder="标题"></el-input>
        <div v-for="(i,index) in text">
          <el-input class="paperview-input-text" v-model="text[index].value" :placeholder="i.label"></el-input>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'New',
  data(){
    return{
      id: 0,
      title: '',
      text: [{type: '',value: '',label: ''}]
    }
  },
  methods: {
    newText(){
      this.text.push({type: 'text',value: '',label: '请输入文本'})
    },
    newImage(){
      this.text.push({type: 'image',value: '',label: '请输入图片url路径'})
    },
    newLink(){
      this.text.push({type: 'link',value: '',label: '请输入链接url'})
    },
    deleteText(){
      this.text.pop()
    },
    go(){
      var list=''
      for(var i=0;i<this.text.length;i++){
        if(this.text[i].type==='text'){
          list+='<p>'+this.$filter.holdDirty(this.text[i].value)+'</p>'
        }
        if(this.text[i].type==='link'){
          list+='<a href="'+this.text[i].value+'">链接</a>'
        }
        if(this.text[i].type==='image'){
          list+='<img src="'+this.text[i].value+'">'
        }
      }
      var a={
        title: this.title,
        writeId: this.id,
        text: list
      }
      this.$http.post(this.$ajax+':6205',a).then(resp=>{
        this.$message.success('已发表')
      })
    }
  },
  created() {
    this.text.splice(0,this.text.length)
    this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
    this.$passKey)).then(resp=>{
      this.id=resp.data.id
    })
  }
}
</script>

<style scoped>
.paperview-input-text >>> .el-input__inner {
  border:none; border-bottom:2px solid #eee;
  width: 500px;
}
</style>
