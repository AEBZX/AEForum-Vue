// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pass from './pass'
import filter from './filter'
import image from './image'

Vue.prototype.$ajax='http://localhost'
Vue.prototype.$http=axios
Vue.prototype.$pass=pass
Vue.prototype.$passKey=123456789
Vue.prototype.$filter=filter
Vue.prototype.$image=image
Vue.use(Element)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
