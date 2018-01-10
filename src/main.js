// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from './vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import confJson from '../static/conf_pack.json'

// const url = 'http://192.168.0.25:8333' //本地
// const url = 'http://120.78.173.153:80' //线上
const url = 'http://120.78.173.153:8333' //线上

Vue.prototype.$api = `${url}`
Vue.prototype.$confJson = confJson

// Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
