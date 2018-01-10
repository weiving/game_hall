<template>
  <div id="loginTryPlay">
    <div class="login-head">
      <router-link to="/login">
        <img src="/static/img/left.png"/>
      </router-link>
      <div class="title">一键登录</div>
    </div>
    <div class="login-content">
      <div class="tip-title">
        <p>强烈建议 <span>【截屏】</span>保存以下信息，避免丢失!</p>
      </div>
      <div class="log-item">
        <span class="username-icon"></span>
        <span class="username-text">登录账号:</span>
        <span class="username-account">c4367629983</span>
      </div>
      <div class="log-item">
        <span class="password-icon"></span>
        <span class="password-text">登录密码:</span>
        <span class="password-account">4367629983</span>
      </div>
      <div class="log-item enter-game">
        <p>进入游戏</p>
      </div>
    </div>
    <div class="login-footer">
      <p class="find-password">找回密码请联系客服</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login-try-play"
    }
</script>

<style scoped>
  #loginTryPlay {
    width: 100%;
    height: 100%;
    background-image: url('/static/img/bg.png');
    background-size: cover;
    letter-spacing: 1px;
  }

  .login-head {
    padding: 20px 13px;
    position: relative;
    text-align: center;
    color: #fff;
    font-size: 24px;
  }

  .login-head img {
    position: absolute;
    top: 23px;
    left: 13px;
    width: 11px;
    height: 19px;
  }

  .login-content {
    width: 100vw;
    padding: 125px 13vw 0 13vw;
    color: #ABB8BF;
  }

  .login-content .tip-title {
    font-size: 12px;
    color: #666666;
    margin-bottom: 30px;
    text-align: center;
  }

  .login-content .tip-title span {
    color: red;
  }

  .login-content .log-item {
    width: 74vw;
    height: 40px;
    background: #fff;
    border-radius: 40px;
    position: relative;
    padding: 12px 18px;
    margin-bottom: 30px;
  }

  .login-content .log-item .username-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_account.png");
    background-size: cover;
    float: left;
  }

  .login-content .log-item .username-text {
    display: block;
    font-size: 16px;
    margin-left: 10px;
    float: left;
  }

  .login-content .log-item .username-account {
    display: block;
    font-size: 16px;
    margin-left: 10px;
    color: red;
    float: left;
  }

  .login-content .log-item .password-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_password.png");
    background-size: cover;
    float: left;
  }

  .login-content .log-item .password-text {
    display: block;
    font-size: 16px;
    margin-left: 10px;
    float: left;
  }

  .login-content .log-item .password-account {
    display: block;
    font-size: 16px;
    margin-left: 10px;
    color: red;
    float: left;
  }

  .login-content .enter-game {
    background: #EFAE4E;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }

  .login-footer {
    width: 100vw;
    text-align: center;
    font-size: 14px;
    color: #fff;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
  }
</style>
