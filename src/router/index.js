import Vue from 'vue'
import Router from 'vue-router'
import Hall from '@/components/hall/Hall'

import recharge from '@/components/recharge/recharge'
import bindCard from '@/components/recharge/bindCard'
import manageCard from '@/components/recharge/manageCard'
import selectCard from '@/components/recharge/selectCard'

import msgCenter from '@/components/message/msgCenter'
import msgMy from '@/components/message/msgMy'
import msgMyDetail from '@/components/message/msgMyDetail'
import msgMySend from '@/components/message/msgMySend'
import msgTypeList from '@/components/message/msgTypeList'
import msgTypeDetail from '@/components/message/msgTypeDetail'

import my from '@/components/my/my'
import reportRecord from '@/components/queryReport/reportRecord'
import reportDetail from '@/components/queryReport/reportDetail'
import record from '@/components/queryRecord/record'
import recordDetail from '@/components/queryRecord/recordDetail'
import capitalRecord from '@/components/queryCapital/capitalRecord'
import capitalDetail from '@/components/queryCapital/capitalDetail'

import openAccount from '@/components/openAccount/openAccount'
import lowerManage from '@/components/lowerManage/lowerManage'
import lowerDetail from '@/components/lowerManage/lowerDetail'
import shareBonus from '@/components/lowerManage/shareBonus'
import shareBonusDetail from '@/components/lowerManage/shareBonusDetail'
import dailyWages from '@/components/lowerManage/dailyWages'
import dailyWagesDetail from '@/components/lowerManage/dailyWagesDetail'
import packetManage from '@/components/redPacket/packetManage'
import packetManageDetail from '@/components/redPacket/packetManageDetail'
import sendPacket from '@/components/redPacket/sendPacket'


import register from '@/components/register/register'
import regSuccess from '@/components/register/regSuccess'
import login from '@/components/login/login'
import loginRecord from '@/components/login/loginRecord'
import loginTryPlay from '@/components/login/loginTryPlay'
import maintenance from '@/components/login/maintenance'


import mySet from '@/components/mySet/mySet'
import updatePwd from '@/components/mySet/updatePwd'
import updateNick from '@/components/mySet/updateNick'
import setPhone from '@/components/mySet/setPhone'
import setQQ from '@/components/mySet/setQQ'
import setWeChat from '@/components/mySet/setWeChat'
import setEmail from '@/components/mySet/setEmail'
import gValidate from '@/components/mySet/gValidate'


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
      path: '/selectCard',
      name: 'selectCard',
      component: selectCard
    },


    {
      path: '/message/msgCenter',
      name: 'msgCenter',
      component: msgCenter
    },
    {
      path: '/message/msgMy',
      name: 'msgMy',
      component: msgMy
    },
    {
      path: '/message/msgMyDetail',
      name: 'msgMyDetail',
      component: msgMyDetail
    },
    {
      path: '/message/msgMySend',
      name: 'msgMySend',
      component: msgMySend
    },
    {
      path: '/message/msgTypeList',
      name: 'msgTypeList',
      component: msgTypeList
    },
    {
      path: '/message/msgTypeDetail',
      name: 'msgTypeDetail',
      component: msgTypeDetail
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
      path: '/openAccount/openAccount',
      name: 'openAccount',
      component: openAccount
    },
    {
      path: '/lowerManage/lowerManage',
      name: 'lowerManage',
      component: lowerManage
    },
    {
      path: '/lowerManage/lowerDetail',
      name: 'lowerDetail',
      component: lowerDetail
    },
    {
      path: '/lowerManage/shareBonus',
      name: 'shareBonus',
      component: shareBonus
    },
    {
      path: '/lowerManage/shareBonusDetail',
      name: 'shareBonusDetail',
      component: shareBonusDetail
    },
    {
      path: '/lowerManage/dailyWages',
      name: 'dailyWages',
      component: dailyWages
    },
    {
      path: '/lowerManage/dailyWagesDetail',
      name: 'dailyWagesDetail',
      component: dailyWagesDetail
    },
    {
      path: '/redPacket/packetManage',
      name: 'packetManage',
      component: packetManage
    },
    {
      path: '/redPacket/packetManageDetail',
      name: 'packetManageDetail',
      component: packetManageDetail
    },
    {
      path: '/redPacket/sendPacket',
      name: 'sendPacket',
      component: sendPacket
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
      path: '/mySet/setQQ',
      name: 'setQQ',
      component: setQQ
    },
    {
      path: '/mySet/setWeChat',
      name: 'setWeChat',
      component: setWeChat
    },
    {
      path: '/mySet/setEmail',
      name: 'setEmail',
      component: setEmail
    },
    {
      path: '/mySet/setPhone',
      name: 'setPhone',
      component: setPhone
    },
    {
      path: '/mySet/gValidate',
      name: 'gValidate',
      component: gValidate
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
