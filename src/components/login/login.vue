<template>
  <div id="login">
    <div class="login-head">
      <img src="/static/img/left.png" @click="go_back"/>
      <div class="title">用户登录</div>
      <router-link to="/register">
        <span class="toReg">免费注册</span>
      </router-link>
    </div>
    <div class="login-content">
      <div class="log-item">
        <span class="username-icon"></span>
        <input type="text" class="username" v-model="username" @click="focusInput" placeholder="输入手机号\用户名">
        <div class="error-msg" v-if="isShow_username_msg">{{msg}}</div>
      </div>
      <div class="log-item">
        <span class="password-icon"></span>
        <input :type="password_type" class="password" v-model="password" @click="focusInput" placeholder="输入密码"
               autocomplete="new-password">
        <span v-bind:class="{'open-icon':isShowPwd,'close-icon':!isShowPwd}" @click="showPwd"></span>
        <div class="error-msg" v-if="isShow_password_msg">{{msg}}</div>
      </div>
      <div class="log-item log-btn" @click="login" :class="{active:!isValid}">
        <span>登录</span>
      </div>
      <router-link to="/loginTryPlay">
        <div class="log-item try-btn">
          <span>一键登录</span>
        </div>
      </router-link>
      <div class="log-item outer-btn">
        <span>游客登录</span>
      </div>
    </div>
    <div class="login-other">
      <div class="other-title">
        <span class="line"></span>
        <span class="text">第三方登录</span>
        <span class="line"></span>
      </div>
      <div class="other-wrap">
        <img src="/static/img/QQ.png" class="qq-icon" alt="qq登录">
        <img src="/static/img/wx.png" class="weixin-icon" alt="微信登录">
      </div>
    </div>
    <div class="login-footer">
      <p class="find-password">找回密码请联系客服</p>
    </div>
    <div class="mask" v-if="isShow_login_msg" @click="showMask"></div>
    <div class="error-mask" v-if="isShow_login_msg" @click="showMask">{{msg}}</div>
  </div>
</template>

<script>
  // import {setCookie} from "/static/js/util";
  import {setCookie} from "../../../static/js/util";

  export default {
    name: "login",
    data: function () {
      return {
        username: '',
        password: '',
        password_type: "password",
        isShowPwd: false,
        msg: '',
        isShow_username_msg: false,
        isShow_password_msg: false,
        isShow_login_msg: false,
        isValid: true
      }
    },
    methods: {
      //点击显示密码
      showPwd() {
        if (this.password_type == 'password') {
          this.password_type = 'text';
          this.isShowPwd = true;
        } else {
          this.password_type = 'password';
          this.isShowPwd = false;
        }
      },
      focusInput() {
        return [this.isShow_username_msg = false,
          this.isShow_password_msg = false,
          this.isValid = true
        ];
      },
      login() {
        if (this.isValid) {
          if (this.username == '' || this.username == undefined) {
            this.msg = "请输入账户名~";
            this.isShow_username_msg = true;
            return this.isValid = false;
          } else if (this.password == '' || this.password == undefined) {
            this.msg = "请输入密码~";
            this.isShow_password_msg = true;
            return this.isValid = false;
          }
          var params = new URLSearchParams();
          params.append('account', this.username);
          params.append('password', this.password);
          this.$http
            .post(`${this.$api}/login/account`, params)
            .then(res => {
              if (res.data.success == 1) {
                // localStorage.session = res.data.session;
                setCookie("session", res.data.session, 1);
                this.$router.push({path: '/'})
              } else {
                this.isShow_login_msg = true;
                this.msg = "账号或密码不正确~";
                var _this = this;
                setTimeout(function () {
                  _this.isShow_login_msg = false;
                }, 500)
              }
            })
            .catch(err => {
              this.isShow_login_msg = true;
              this.msg = err.error;
              var _this = this;
              setTimeout(function () {
                _this.isShow_login_msg = false;
              }, 500)
            })
        }
      },
      showMask() {
        this.isShow_login_msg = !this.isShow_login_msg;
      },
      //返回上一页
      go_back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
    background-image: url('/static/img/bg.png');
    background-size: cover;
    letter-spacing: 1px;
    position: relative;
  }

  #login .mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
    opacity: 0.2;
    filter: alpha(opacity=20);
    background: #000;
  }

  #login .error-mask {
    position: absolute;
    top: 40%;
    left: -webkit-calc((100vw - 180px) / 2);
    left: -moz-calc((100vw - 180px) / 2);
    left: calc((100vw - 180px) / 2);
    height: 39px;
    width: 180px;
    background: rgba(0, 0, 0, 0.5);
    padding: 11px 15px;
    border-radius: 5px;
    color: #ffff;
    font-size: 16px;
    z-index: 1000;
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

  .login-head .toReg {
    position: absolute;
    top: 25px;
    right: 10px;
    font-size: 18px;
    color: #fff;
  }

  .login-content {
    width: 100vw;
    padding: 125px 13vw 0px 13vw;
    color: #ABB8BF;
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

  .login-content .log-item input {
    width: -webkit-calc(74vw - 84px);
    width: -moz-calc(74vw - 84px);
    width: calc(74vw - 84px);
    height: 19px;
    margin-left: 16px;
    float: left;
  }

  .login-content .log-item input:focus {
    -webkit-box-shadow: 0 0 5px #fff;
    -moz-box-shadow: 0 0 5px #fff;
    box-shadow: 0 0 5px #fff;
    border-color: #fff;
    background: #fff;
  }

  .login-content .log-item .username-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_account.png");
    background-size: cover;
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

  .login-content .log-item .password {
    width: -webkit-calc(74vw - 93px);
    width: -moz-calc(74vw - 93px);
    width: calc(74vw - 93px);
  }

  .login-content .log-item .close-icon {
    display: block;
    width: 17px;
    height: 12px;
    background-image: url("/static/img/ico_ice_up_2.png");
    background-size: cover;
    float: left;
    margin-top: 2px;
    margin-left: 5px;
  }

  .login-content .log-item .open-icon {
    display: block;
    width: 17px;
    height: 12px;
    background-image: url("/static/img/ico_ice_down_2.png");
    background-size: cover;
    float: left;
    margin-top: 2px;
    margin-left: 5px;
  }

  .login-content .log-item.log-btn {
    background: #55AAFF;
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin-bottom: 25px;
  }

  .login-content .log-item.try-btn {
    background: #EFAE4E;
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin-bottom: 25px;
  }

  .login-content .log-item.outer-btn {
    background: #6AC192;
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin-bottom: 25px;
  }

  .login-content .log-item.active {
    background: #DDDDDD;
  }

  .login-content .error-msg {
    position: absolute;
    top: 40px;
    left: 13vw;
    height: 39px;
    background: rgba(0, 0, 0, 0.5);
    padding: 11px 15px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    z-index: 10;
  }

  .login-other {
    width: 100vw;
    height: 100px;
    padding: 20px 10vw 0px 10vw;
    color: #fff;
    text-align: center;
  }

  .login-other .other-title {
    height: 20px;
    color: #fff;
    position: relative;
  }

  .login-other .other-title .line {
    display: block;
    width: 25vw;
    height: 1px;
    float: left;
    margin-top: 6px;
    background: #fff;
  }

  .login-other .other-title .text {
    display: block;
    width: 30vw;
    float: left;
  }

  .login-other .other-wrap {
    margin-top: 10px;
    text-align: center;
  }

  .login-other .other-wrap .qq-icon {
    width: 35px;
    height: 35px;
  }

  .login-other .other-wrap .weixin-icon {
    width: 35px;
    height: 35px;
    margin-left: 30px;
  }

  .login-footer {
    width: 100vw;
    text-align: center;
    font-size: 14px;
    color: #fff;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
</style>
