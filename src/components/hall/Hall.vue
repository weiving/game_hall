<template>
  <div id="hall-index">
    <hCarousel></hCarousel>
    <hNav :onlineNum="onlineNum"></hNav>
    <hContent></hContent>
    <div class="mask" v-if="isShowMask"></div>
    <div class="redPacket-popover" v-if="redPacketPopover">
      <div class="unpack" @click="openPack" :class="{active:isOpen}"></div>
      <div class="close-btn" @click="closeRedPacketPop">
        <div class="close-icon"></div>
      </div>
    </div>
    <div class="msg-popover" v-if="msgPopover">
      <div class="msg-panel">
        <div class="msg-body">
          <div class="msg-logo"></div>
          <div class="msg-content">
            <div class="title" v-html="popUpData.title"></div>
            <div v-html="popUpData.content"></div>
          </div>
        </div>
        <div class="msg-footer">
          <div class="col-xs-6" @click="beforePopUp">
            <div class="before" :class="{active:popUpIndex>0}">上一条</div>
          </div>
          <div class="col-xs-6" @click="nextPopUp">
            <div class="next" :class="{active:popUpIndex!=(popUpList.length-1)}">下一条
              <div class="circle" v-if="popUpMoreLength!=0"><i class="num">{{popUpMoreLength}}</i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="close-btn" @click="closeMsgPop">
        <div class="close-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import hCarousel from '@/components/hall/hCarousel'
  import hNav from '@/components/hall/hNav'
  import hContent from '@/components/hall/hContent'
  import {getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "hall",
    created() {
      this.getOnlineNum();
      this.getPopUp();
    },
    data() {
      return {
        onlineNum: 0,
        isShowMask: false,
        redPacketPopover: false,
        isOpen: false,
        msgPopover: false,
        popUpList: [],
        popUpIndex: 0,
        popUpData: '',
        popUpMoreLength: ''
      }
    },
    methods: {
      getOnlineNum: function () {
        this.$http
          .post(`${this.$api}/v1/pubsub/r/online`)
          .then(res => {
            var resData = res.data;
            if (resData.success == 1) {
              this.onlineNum = resData.data.concurrent;
            } else {
              console.log('在线人数', res.data.message)
            }
          })
          .catch(err => {
            console.log('在线人数', err.message)
          })
      },
      closeRedPacketPop() {
        this.isShowMask = false;
        this.redPacketPopover = false;
      },
      openPack() {
        this.isOpen = true;
      },
      closeMsgPop() {
        this.isShowMask = false;
        this.msgPopover = false;
        removeLocalStorage('isPopUp');
      },
      getPopUp() {
        var isPopUp = getLocalStorage('isPopUp');
        if (isPopUp != undefined && isPopUp != '') {
          var user_id = getLocalStorage('user_id');
          var user_name = getLocalStorage('user_name');
          var session = getLocalStorage('session');
          var params = new URLSearchParams();
          params.append('device', 1);
          this.$http
            .post(`${this.$api}/v1/notice/r/get_login_index_notice/${user_id}/${user_name}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              // console.log('弹窗', resData);
              if (resData.success == true) {
                this.popUpList = resData.data;
                if (this.popUpList.length > 0) {
                  this.isShowMask = true;
                  this.msgPopover = true;
                  this.popUpData = resData.data[0];
                  this.popUpMoreLength = resData.data.length - 1;
                }
              } else {

              }
            })
        }
      },
      nextPopUp() {
        if (this.popUpIndex < this.popUpList.length - 1) {
          this.popUpIndex = this.popUpIndex + 1;
          this.popUpData = this.popUpList[this.popUpIndex];
          if (this.popUpMoreLength > 0) {
            this.popUpMoreLength = this.popUpMoreLength - 1;
          }
        }
      },
      beforePopUp() {
        if (this.popUpIndex >= 1) {
          this.popUpIndex = this.popUpIndex - 1;

          this.popUpData = this.popUpList[this.popUpIndex];
        }
      }
    },
    components: {
      'hCarousel': hCarousel,
      'hNav': hNav,
      'hContent': hContent,
    },
    destroyed() {
      removeLocalStorage('isPopUp');
    }
  }
</script>

<style scoped lang="less">

</style>
