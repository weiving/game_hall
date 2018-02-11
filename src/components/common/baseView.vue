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

  import gameFrame from '@/components/common/gameFrame'
  import withdrawal from '@/components/withdrawal/withdrawal'

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
          console.log('currentView', _this.currentView)
        })
      }
    },
    components: {
      Hall,
      recharge,
      bindCard,
      manageCard,
      msgCenter,
      msgList,
      msgDetail,
      msgSend,
      my,
      reportRecord,
      reportDetail,
      record,
      recordDetail,
      capitalRecord,
      capitalDetail,
      register,
      regSuccess,
      login,
      loginRecord,
      loginTryPlay,
      mySet,
      updatePwd,
      updateNick,
      setPhone,
      ranking,
      gameFrame,
      withdrawal
    }
  }
</script>

<style scoped>

</style>
