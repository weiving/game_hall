<template>
  <div id="hall-index">
    <hCarousel></hCarousel>
    <hNav :onlineNum="onlineNum"></hNav>
    <hContent></hContent>
    <!--<iFooter v-bind:isHome="true"></iFooter>-->
    <div class="mask" v-if="isShow_msg"></div>
    <div class="redPacket-popover" v-if="redPacketPopover">
      <div class="unpack" @click="openPack" :class="{active:isOpen}"></div>
      <div class="close-btn" @click="closePopover">
        <div class="close-icon"></div>
      </div>
    </div>
    <div class="msg-popover" v-if="msgPopover">
      <div class="msg-content">立即弹窗</div>
    </div>
  </div>
</template>

<script>
  import hCarousel from '@/components/hall/hCarousel'
  import hNav from '@/components/hall/hNav'
  import hContent from '@/components/hall/hContent'
  // import iFooter from '@/components/footer/iFooter'

  export default {
    name: "hall",
    created() {
      this.getOnlineNum();
    },
    data() {
      return {
        slideList: '',
        onlineNum: 0,
        isShow_msg: false,
        redPacketPopover: false,
        isOpen: false,
        msgPopover: false,
        sdfs: false
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
      closePopover() {
        this.isShow_msg = false;
        this.redPacketPopover = false;
      },
      openPack() {
        this.isOpen = true;
      }
    },
    components: {
      'hCarousel': hCarousel,
      'hNav': hNav,
      'hContent': hContent,
    },
    destroyed() {

    }
  }
</script>

<style scoped lang="less">
  #hall-index {
    height: 100%;
    background-color: #F7FBFF;
    overflow: auto;

    .redPacket-popover {
      position: absolute;
      top: 30%;
      left: 0;
      right: 0;
      width: 100%;
      height: 250px;
      z-index: 101;
      text-align: center;
      .unpack {
        width: 321px;
        height: 195px;
        background: url("/static/img/unpack.png");
        background-size: cover;
        margin: 0 auto;
        &.active {
          background: url("/static/img/opening.png");
          background-size: cover;
        }
      }

      .close-btn {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        .close-icon {
          width: 24px;
          height: 24px;
          background: url("/static/img/close.png");
          background-size: cover;
          margin: 0 auto;
        }
      }

    }

    .msg-popover {
      position: absolute;
      top: 30%;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 101;
      text-align: center;
      .msg-content {
        width: 70%;
        background: #ffffff;
        border-radius: 3px;
        margin: 0 auto;

      }
    }
  }
</style>
