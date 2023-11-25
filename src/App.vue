<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    reload(){
      window.location.reload()
    }
  },
  watch: {
    '$route.path': 'reload'
  }
}
</script>

<style>
</style>
