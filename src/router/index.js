import Vue from 'vue'
import Router from 'vue-router'

import register from '@/components/register/register'
import phoneRegister from '@/components/register/phoneRegister'
import registerCode from '@/components/register/registerCode'
import login from '@/components/login/login'
import loginRecord from '@/components/login/loginRecord'
import loginTryPlay from '@/components/login/loginTryPlay'
import maintenance from '@/components/login/maintenance'

import index from '@/components/try/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import baseView from '@/components/common/baseView'
import gameFrame from '@/components/common/gameFrame'

Vue.use(Router)
Vue.use(VueAwesomeSwiper)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'baseView',
      component: baseView,
      // components: {
      //   "main": baseView,
      // }
    },
    {
      path: '/common/gameFrame',
      name: 'gameFrame',
      component: gameFrame
    },

    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/phoneRegister',
      name: 'phoneRegister',
      component: phoneRegister
    },
    {
      path: '/registerCode',
      name: 'registerCode',
      component: registerCode
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login/loginRecord',
      name: 'loginRecord',
      component: loginRecord
    },
    {
      path: '/loginTryPlay',
      name: 'loginTryPlay',
      component: loginTryPlay
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: maintenance
    },

    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
