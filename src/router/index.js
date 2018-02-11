import Vue from 'vue'
import Router from 'vue-router'
import Hall from '@/components/hall/Hall'
import recharge from '@/components/recharge/recharge'
import bindCard from '@/components/recharge/bindCard'
import manageCard from '@/components/recharge/manageCard'

import msgCenter from '@/components/message/msgCenter'
import msgList from '@/components/message/msgList'
import msgDetail from '@/components/message/msgDetail'
import msgSend from '@/components/message/msgSend'
import my from '@/components/my/my'
import reportRecord from '@/components/queryReport/reportRecord'
import reportDetail from '@/components/queryReport/reportDetail'
import record from '@/components/queryRecord/record'
import recordDetail from '@/components/queryRecord/recordDetail'
import capitalRecord from '@/components/queryCapital/capitalRecord'
import capitalDetail from '@/components/queryCapital/capitalDetail'

import register from '@/components/register/register'
import regSuccess from '@/components/register/regSuccess'
import login from '@/components/login/login'
import loginRecord from '@/components/login/loginRecord'
import loginTryPlay from '@/components/login/loginTryPlay'

import mySet from '@/components/mySet/mySet'
import updatePwd from '@/components/mySet/updatePwd'
import updateNick from '@/components/mySet/updateNick'
import setPhone from '@/components/mySet/setPhone'

import ranking from '@/components/ranking/ranking'
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
      component: baseView
    },
    {
      path: '/common/gameFrame',
      name: 'gameFrame',
      component: gameFrame
    },
    {
      path: '/hall/Hall',
      name: 'Hall',
      component: Hall
    },
    {
      path: '/recharge/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/bindCard',
      name: 'bindCard',
      component: bindCard
    },
    {
      path: '/manageCard',
      name: 'manageCard',
      component: manageCard
    },

    {
      path: '/message/msgCenter',
      name: 'msgCenter',
      component: msgCenter
    },
    {
      path: '/message/msgList',
      name: 'msgList',
      component: msgList
    },
    {
      path: '/message/msgDetail',
      name: 'msgDetail',
      component: msgDetail
    },
    {
      path: '/message/msgSend',
      name: 'msgSend',
      component: msgSend
    },

    {
      path: '/my/my',
      name: 'my',
      component: my
    },
    {
      path: '/queryReport/reportRecord',
      name: 'reportRecord',
      component: reportRecord
    },
    {
      path: '/queryReport/reportDetail',
      name: 'reportDetail',
      component: reportDetail
    },
    {
      path: '/queryRecord/record',
      name: 'record',
      component: record
    },
    {
      path: '/queryRecord/recordDetail',
      name: 'recordDetail',
      component: recordDetail
    },
    {
      path: '/queryCapital/capitalRecord',
      name: 'capitalRecord',
      component: capitalRecord
    },
    {
      path: '/queryCapital/capitalDetail',
      name: 'capitalDetail',
      component: capitalDetail
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
      path: '/login/login',
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
      path: '/mySet/mySet',
      name: 'mySet',
      component: mySet
    },
    {
      path: '/mySet/updatePwd',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/mySet/updateNick',
      name: 'updateNick',
      component: updateNick
    },
    {
      path: '/mySet/setPhone',
      name: 'setPhone',
      component: setPhone
    },
    {
      path: '/ranking/ranking',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
