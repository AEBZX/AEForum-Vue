function blob(id){
  var uri
  this.$http.get(this.$ajax+':6204/'+id,{responseType: 'blob'}).then(resp=>{
    let blob = new window.Blob([resp.data]);
    let url = window.URL.createObjectURL(blob);
     uri = url;
  })
  return uri
}
export default {
  blob
}
