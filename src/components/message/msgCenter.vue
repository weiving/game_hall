<template>
  <div id="msgCenter" class="page-wrap">
    <div class="page-head">
      <!--<router-link to="/" class="toReturn">-->
      <!--<img src="/static/img/left.png" alt="">-->
      <!--</router-link>-->
      <div class="title">消息中心</div>
    </div>
    <div class="page-content">
      <div class="box-item">
        <div class="horn-icon"></div>
        <div class="item-content">
          <div class="title">系统公告</div>
          <div class="text">大家好！充值平台已于12月18日...</div>
          <div class="time">2017年12月27日</div>
        </div>
      </div>
      <div class="box-item" @click="toMsgType('myMsg','我的消息')">
        <div class="bell-icon"></div>
        <div class="item-content">
          <div class="title">我的消息</div>
          <div class="text">大家好！充值平台已于12月18日...</div>
          <div class="time">2017年12月27日</div>
        </div>
      </div>
      <div class="box-item">
        <div class="flag-icon"></div>
        <div class="item-content">
          <div class="title">系统消息</div>
          <div class="text">亲爱的玩家您可以点击选择官网充值...</div>
          <div class="time">2017年12月27日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-center",
    data() {
      return {}
    },
    methods: {
      // select_msgType(msgType, msgType_title) {
      //   setLocalStorage("msgType", msgType);
      //   setLocalStorage("msgType_title", msgType_title);
      //   this.$router.push({path: '/msgList'});
      // }
      toMsgType(msgType, msgType_title) {
        setLocalStorage("msgType", msgType);
        setLocalStorage("msgType_title", msgType_title);
        this.$root.Bus.$emit('toggleComponent', 'msgList')
      }

    }
  }
</script>

<style scoped>


</style>
