<template>
  <!--<div class="myIFrame">-->
  <!--<iframe :src="src" frameborder="0" width="100%" height="100%"></iframe>-->
  <!--</div>-->
  <!--<iframe src="http://192.168.1.119:8000/#/hall/Hall" frameborder="0" width="100%" height="100%"></iframe>-->
  <!--<iframe src="/#/hall/Hall" frameborder="0" width="100%" height="100%" id="iframe"></iframe>-->
  <component :is="currentView"></component>
</template>

<script>
  import Hall from '@/components/hall/Hall'

  import recharge from '@/components/recharge/recharge'
  import bindCard from '@/components/recharge/bindCard'
  import manageCard from '@/components/recharge/manageCard'
  import selectCard from '@/components/recharge/selectCard'
  import onlinePay from '@/components/recharge/onlinePay'

  import ordinaryPay from '@/components/recharge/ordinaryPay'
  import ordinaryOrder from '@/components/recharge/ordinaryOrder'
  import withdraw from '@/components/recharge/withdraw'

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
  import shareQartCode from '@/components/openAccount/shareQartCode'
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
  import setName from '@/components/mySet/setName'


  import ranking from '@/components/ranking/ranking'
  import gameFrame from '@/components/common/gameFrame'

  export default {
    name: "base-view",
    created() {
      this.getComponent();
    },
    data() {
      return {
        currentView: Hall
      }
    },
    methods: {
      getComponent() {
        const _this = this
        this.$root.Bus.$on('toggleComponent', function (componentName) {
          _this.currentView = componentName
          // console.log('currentView', _this.currentView)
        })
      }
    },
    components: {
      Hall,

      recharge,
      bindCard,
      manageCard,
      selectCard,
      onlinePay,
      ordinaryPay,
      ordinaryOrder,
      withdraw,

      msgCenter,
      msgMy,
      msgMyDetail,
      msgMySend,
      msgTypeList,
      msgTypeDetail,

      my,
      reportRecord,
      reportDetail,
      record,
      recordDetail,
      capitalRecord,
      capitalDetail,

      openAccount,
      shareQartCode,
      lowerManage,
      lowerDetail,
      shareBonus,
      shareBonusDetail,
      dailyWages,
      dailyWagesDetail,
      packetManage,
      packetManageDetail,
      sendPacket,

      register,
      regSuccess,
      login,
      loginRecord,
      loginTryPlay,
      maintenance,

      mySet,
      updatePwd,
      updateNick,
      setPhone,
      setQQ,
      setWeChat,
      setEmail,
      gValidate,
      setName,

      ranking,
      gameFrame,
    }
  }
</script>

<style scoped>

</style>
