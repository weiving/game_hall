// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime'
import confJson from '../static/conf_pack.json'

import 'swiper/dist/css/swiper.css'
import "vue-ydui/dist/ydui.base.css"
import '../static/css/hall.less'

// const url = 'http://192.168.1.108:8333' //本地
const url = 'http://192.168.1.110:8333';
// const url = 'http://120.78.173.153:8333' //线上
const wsurl = 'ws://192.168.1.110/v1/pubsub';//websocket连接




Vue.prototype.$api = `${url}`
Vue.prototype.$confJson = confJson
Vue.prototype.$wsurl = `${wsurl}`
// Vue.prototype.$myWebSocket='11555777'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component(DateTime.name, DateTime);

const Bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    Bus
  },
  template: '<App/> ',
  components: {App}
})
// 在子组件中通过this.$root.Bus.on(),this.$root.Bus.emit()来调用
