<template>
  <div style="height: 810px">
    <el-table :data="trueList">
      <el-table-column prop="image" label="头像">
        <template slot-scope="scope">
          <el-avatar :src="imageList[scope.$index]"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="Follow(scope.row.id)">关注</el-button>
          <el-button type="text" @click="redirectDetails(scope.row.id)">用户资料页</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-container>
      <el-aside>
      </el-aside>
      <el-main>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="20000"
          @current-change="getPageNum">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'FollowYou',
  data(){
    return{
      id: 0,
      trueList: [],
      imageList: [],
      List: []
    }
  },
  methods: {
    Follow(id){
      var a={
        follow: id,
        followYou: this.id
      }
      this.$http.post(this.$ajax+':6202/',a).then(resp=>{
        this.$message.success('关注成功')
      })
    },
    redirectDetails(id) {
      this.$router.push('/user/'+id+'?username='+this.$route.query.username+'&password='+this.$route.query.password+
        '&register=false&logging=false&login=true')
    },
    getPageNum(val) {
      this.$http.get(this.$ajax+':6202/follow/'+this.id+'/'+(val-1)+'/10').then(resp=>{
        this.List=resp.data.content
        this.List.shift()
        this.trueList.splice(0,this.trueList.length)
        this.imageList.splice(0,this.imageList.length)
        for(var i=0;i<this.List.length;i++){
          this.$http.get(this.$ajax+':6203/'+this.List[i].followYou).then(re=>{
            this.trueList.push(re.data)
            if(re.data.image!==null){
              this.$http.get(this.$ajax+':6204/'+re.data.image,{
                responseType: 'blob'
              }).then(r=>{
                let blob = new window.Blob([r.data]);
                let url = window.URL.createObjectURL(blob);
                this.imageList.push(url);
              })
            }else{
              this.imageList.push('https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
            }
          })
        }
      })
    }
  },
  created() {
    this.$http.get(this.$ajax+':6203/findByUsername/'+this.$pass.decryptDes(this.$route.query.username,
      this.$passKey)).then(resp=>{
      this.id=resp.data.id
      this.$http.get(this.$ajax+':6202/follow/'+resp.data.id+'/0/10').then(res=>{
        this.List=res.data.content
        this.List.shift()
        for(var i=0;i<this.List.length;i++){
          this.$http.get(this.$ajax+':6203/'+this.List[i].followYou).then(re=>{
            this.trueList.push(re.data)
            if(re.data.image!==null){
              this.$http.get(this.$ajax+':6204/'+re.data.image,{
                responseType: 'blob'
              }).then(r=>{
                let blob = new window.Blob([r.data]);
                let url = window.URL.createObjectURL(blob);
                this.imageList.push(url);
              })
            }else{
              this.imageList.push('https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
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
