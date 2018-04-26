<template>
  <div id="footer">
    <div class="footer-wrap">
      <div class="f-item" v-for="(item,index) in footerStatus" :class="{active:defaultFooterStatus==item}">
        <div class="footer-item" @click="toComponent(item)">
          <i :class="item+'-icon'"></i>
          <div class="text">{{footerName[index]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "iFooter",
    created() {
      this.getFooterStatus();
    },
    data() {
      return {
        footerStatus: ['hall', 'recharge', 'msgCenter', 'my'],
        footerName: ['首页', '充值', '消息', '我的'],
        defaultFooterStatus: 'hall'
      }
    },
    methods: {
      getFooterStatus() {
        const _this = this;
        this.$root.Bus.$on('footerStatus', function (status) {
          _this.defaultFooterStatus = status;
        });
      },
      toComponent(component) {
        // const oIframe = document.getElementById('iframe');
        // oIframe.setAttribute('src', url);
        // this.$root.Bus.$emit('iframeSrc', url)
        this.$root.Bus.$emit('toggleComponent', component)
        this.defaultFooterStatus = component;
      }
    }
  }
</script>

<style scoped lang="less">
  #footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background: #fff;
    border-top: 1px solid #F5F5F5;
    z-index: 60;

    .footer-wrap .f-item {
      width: 25%;
      float: left;
      padding: 3px 35px;

      .hall-icon {
        display: block;
        width: 22px;
        height: 20px;
        background-image: url("/static/img/home.png");
        background-size: cover;
      }
      .recharge-icon {
        display: block;
        width: 22px;
        height: 20px;
        background-image: url("/static/img/Recharge.png");
        background-size: cover;
      }
      .msgCenter-icon {
        display: block;
        width: 22px;
        height: 20px;
        background-image: url("/static/img/information.png");
        background-size: cover;
      }
      .my-icon {
        display: block;
        width: 22px;
        height: 20px;
        background-image: url("/static/img/My.png");
        background-size: cover;
      }
      .text {
        width: 70px;
        margin-top: 2px;
      }
      &.active {
        .hall-icon {
          background-image: url("/static/img/home01.png");
        }
        .recharge-icon {
          background-image: url("/static/img/Recharge01.png");
        }
        .msgCenter-icon {
          background-image: url("/static/img/information01.png");
        }
        .my-icon {
          background-image: url("/static/img/My01.png");
        }
        .text {
          color: #278CF5;
        }
      }
    }

  }
</style>
