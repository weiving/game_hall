import Vue from 'vue'
import Router from 'vue-router'
import Hall from '@/components/hall/Hall'
import my from '@/components/my/my'
import register from '@/components/register/register'
import regSuccess from '@/components/register/regSuccess'
import login from '@/components/login/login'
import loginRecord from '@/components/login/loginRecord'
import loginTryPlay from '@/components/login/loginTryPlay'
import mySet from '@/components/mySet/mySet'
import updatePwd from '@/components/mySet/updatePwd'
import updateNick from '@/components/mySet/updateNick'
import setPhone from '@/components/mySet/setPhone'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hall',
      component: Hall
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/regSuccess',
      name: 'regSuccess',
      component: regSuccess
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginRecord',
      name: 'loginRecord',
      component: loginRecord
    },
    {
      path: '/loginTryPlay',
      name: 'loginTryPlay',
      component: loginTryPlay
    },
    {
      path: '/mySet',
      name: 'mySet',
      component: mySet
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/updateNick',
      name: 'updateNick',
      component: updateNick
    },
    {
      path: '/setPhone',
      name: 'setPhone',
      component: setPhone
    }
  ]
})
