<template>
  <div id="footer">
    <div class="footer-wrap">
      <div class="f-item" v-bind:class="{active:isHome}">
        <router-link to="/">
          <i class="home-icon"></i>
          <div class="text">首页</div>
        </router-link>
      </div>
      <div class="f-item" v-bind:class="{active:isRecord}">
        <router-link to="/">
          <i class="record-icon"></i>
          <div class="text">充值</div>
        </router-link>
      </div>
      <div class="f-item" v-bind:class="{active:isMessage}">
        <router-link to="/">
          <i class="message-icon"></i>
          <div class="text">消息</div>
        </router-link>
      </div>
      <div class="f-item" v-bind:class="{active:isMy}">
        <router-link to="/my">
          <i class="my-icon"></i>
          <div class="text">我的</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "iFooter",
    props: ['isHome', 'isRecord', 'isMessage', 'isMy']
  }
</script>

<style scoped>
  #footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background: #fff;
    border-top: 1px solid #F5F5F5;
    z-index: 10;
  }

  .footer-wrap .f-item {
    width: 25%;
    float: left;
    padding: 3px 35px;
  }

  .footer-wrap .f-item .home-icon {
    display: block;
    width: 22px;
    height: 20px;
    background-image: url("/static/img/home.png");
    background-size: cover;
  }

  .footer-wrap .f-item.active .home-icon {
    background-image: url("/static/img/home01.png");
  }

  .footer-wrap .f-item .record-icon {
    display: block;
    width: 22px;
    height: 20px;
    background-image: url("/static/img/Recharge.png");
    background-size: cover;
  }

  .footer-wrap .f-item.active .record-icon {
    background-image: url("/static/img/Recharge01.png");
  }

  .footer-wrap .f-item .message-icon {
    display: block;
    width: 22px;
    height: 20px;
    background-image: url("/static/img/information.png");
    background-size: cover;
  }

  .footer-wrap .f-item.active .message-icon {
    background-image: url("/static/img/information01.png");
  }

  .footer-wrap .f-item .my-icon {
    display: block;
    width: 22px;
    height: 20px;
    background-image: url("/static/img/My.png");
    background-size: cover;
  }

  .footer-wrap .f-item.active .my-icon {
    background-image: url("/static/img/My01.png");
  }

  .footer-wrap .f-item .text {
    width: 70px;
    margin-top: 2px;
  }

  .footer-wrap .f-item.active .text {
    color: #278CF5;
  }
</style>
