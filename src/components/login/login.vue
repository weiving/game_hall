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
  import {setLocalStorage, setCookie} from "../../../static/js/util";


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
            .post(`${this.$api}/v1/login/account`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {

                setLocalStorage("session", resData.data.session);
                setLocalStorage("user_id", resData.data.user_id);
                setLocalStorage("user_type", resData.data.user_type);
                setLocalStorage("username", resData.data.username);
                setLocalStorage("isPopUp", true);

                setCookie("session", resData.data.session, 1);
                setCookie("user_id", resData.data.user_id, 1);
                setCookie("user_type", resData.data.user_type, 1);
                setCookie("username", resData.data.username, 1);
                // this.$root.Bus.$emit('toggleComponent', 'hall');

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
</style>
