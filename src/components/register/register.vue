<template>
  <div id="register">
    <div class="reg-head">
      <img src="/static/img/left.png" @click="go_back"/>
      <div class="title">免费注册</div>
      <router-link to="/login">
        <span class="toLogin">直接登录</span>
      </router-link>
    </div>
    <div class="reg-content">
      <div class="reg-item">
        <span class="username-icon"></span>
        <input type="text" class="username" v-model="username" @click="focusInput" placeholder="请输入会员名">
        <div class="error-msg" v-if="isShow_username_msg">{{msg}}</div>
      </div>
      <div class="reg-item">
        <span class="password-icon"></span>
        <input :type="password_type" class="password" v-model="password" @click="focusInput" placeholder="请输入密码">
        <span v-bind:class="{'open-icon':isShowPwd,'close-icon':!isShowPwd}" @click="showPwd"></span>
        <div class="error-msg" v-if="isShow_password_msg">{{msg}}</div>
      </div>
      <div class="reg-item">
        <span class="phone-icon"></span>
        <input type="text" class="phone" v-model="phone" @click="focusInput" placeholder="请输入手机号">
        <div class="error-msg" v-if="isShow_phone_msg">{{msg}}</div>
      </div>
      <div class="reg-item">
        <span class="phoneCode-icon"></span>
        <input type="text" class="phoneCode" v-model="phoneCode" @click="focusInput" placeholder="请输入手机验证码">
        <div class="phoneCode-info">
          <span class="line"></span>
          <span class="getCode" @click="send" :class="{disabled:isDisabled}">{{text}}</span>
        </div>
        <div class="error-msg" v-if="isShow_phoneCode_msg">{{msg}}</div>
      </div>
      <div class="reg-item">
        <span class="code-icon"></span>
        <input type="text" class="code" v-model="code" @click="focusInput" placeholder="请输入验证码">
        <span class="identify-code" @click="vcodeFn">
          <img :src="vcode" alt="图片验证码">
        </span>
        <div class="error-msg" v-if="isShow_code_msg">{{msg}}</div>
      </div>
      <div class="reg-btn" v-on:click="reg">
        <span>立即注册</span>
      </div>
    </div>
    <div class="reg-footer">
      <p class="find-password">找回密码请联系客服</p>
    </div>
    <div class="mask" v-if="isShow_msg" @click="showMask"></div>
    <div class="error-mask" v-if="isShow_msg" @click="showMask">{{msg}}</div>
  </div>
</template>

<script>
  import {getCookie} from "../../../static/js/util.js";

  export default {
    name: "register",
    created() {
      this.vcodeFn();
    },
    data: function () {
      return {
        username: '',
        password: '',
        password_type: "password",
        isShowPwd: false,
        phone: '',
        phoneCode: '',
        code: '',
        vcode: '',
        cookie_vcode: '',
        msg: '',
        isShow_username_msg: false,
        isShow_password_msg: false,
        isShow_phone_msg: false,
        isShow_phoneCode_msg: false,
        isShow_code_msg: false,
        isShow_msg: false,
        isValid: true,
        time: 0,
        second: 60,
        isDisabled: false
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
          this.isShow_phone_msg = false,
          this.isShow_phoneCode_msg = false,
          this.isShow_code_msg = false,
          this.isValid = true
        ];
      },
      vcodeFn() {
        this.$http
          .get(`${this.$api}/vcode.png`)
          .then(res => {
            this.cookie_vcode = res.headers.vcode;
          })
          .catch(err => {

          });
        return this.vcode = this.$api + '/vcode.png?time=' + Date.now();
      },
      send() {
        if (!this.isDisabled) {
          var phValid = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          if (this.phone == '' || this.phone == undefined) {
            this.msg = "请输入手机号码~";
            this.isShow_phone_msg = true;
            return this.isValid = false;
          } else if (!phValid.test(this.phone)) {
            this.msg = "请输入正确的手机号码~";
            this.isShow_phone_msg = true;
            return this.isValid = false;
          }
          if(!this.isShow_phone_msg){
            var params = new URLSearchParams();
            params.append("phone", this.phone);
            this.$http
              .post(`${this.$api}/text_msg`, params)
              .then(res => {
                console.log("res", res);
                if (res.data.success == 1) {
                  console.log(res.data.message)
                  this.isDisabled = true;
                  setTimeout(this.run, 1000);
                } else {

                }
              })
              .catch(err => {

              });
          }
        }
      },
      run() {
        this.time = this.second
        this.timer()
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.isDisabled = false;
        }
      },
      reg() {
        //用户名正则，5到18位（字母，数字）
        var uValid = /^[a-zA-Z0-9]{5,18}$/;
        //密码正则，6到20位（字母，数字）
        var pValid = /^[a-zA-Z0-9]{6,20}$/;

        var phValid = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

        if (this.username == '' || this.username == undefined) {
          this.msg = "请输入会员名~";
          this.isShow_username_msg = true;
          return this.isValid = false;
        } else if (!uValid.test(this.username)) {
          this.msg = "请输入5到18位（字母，数字）~";
          this.isShow_username_msg = true;
          return this.isValid = false;
        } else if (this.password == '' || this.password == undefined) {
          this.msg = "请输入密码~";
          this.isShow_password_msg = true;
          return this.isValid = false;
        } else if (!pValid.test(this.password)) {
          this.msg = "请输入6到20位（字母，数字）~";
          this.isShow_password_msg = true;
          return this.isValid = false;
        } else if (this.phone == '' || this.phone == undefined) {
          this.msg = "请输入手机号码~";
          this.isShow_phone_msg = true;
          return this.isValid = false;
        } else if (!phValid.test(this.phone)) {
          this.msg = "请输入正确的手机号码~";
          this.isShow_phone_msg = true;
          return this.isValid = false;
        } else if (this.phoneCode == '' || this.phoneCode == undefined) {
          this.msg = "请输入手机验证码~";
          this.isShow_phoneCode_msg = true;
          return this.isValid = false;
        } else if (this.code == '' || this.code == undefined) {
          this.msg = "请输入验证码~";
          this.isShow_code_msg = true;
          return this.isValid = false;
        }

        if (this.isValid) {
          var params = new URLSearchParams();
          params.append("user", this.username);
          params.append("password", this.password);
          params.append("phone", this.phone);
          params.append("code", this.phoneCode);
          params.append("vcode", this.code);

          this.$http
            .post(`${this.$api}/register/phone?vcode=${this.cookie_vcode}`, params)
            .then(res => {
              console.log("res", res);
              if (res.data.success == 1) {
                // this.$router.push({path: '/regSuccess'})
                this.isShow_msg = true;
                this.msg = res.data.message;
                var _this = this
                setTimeout(function () {
                  _this.$router.push({path: '/login'})
                }, 500)
              } else {
                this.isShow_msg = true;
                this.msg = res.data.message;
                var _this = this
                setTimeout(function () {
                  _this.isShow_msg = false;
                  this.msg = '';
                }, 2000)
              }
            })
            .catch(err => {
              this.isShow_msg = true;
              this.msg = err.data.message;
              var _this = this
              setTimeout(function () {
                _this.isShow_msg = false;
                this.msg = '';
              }, 2000)
            });
        }
      },

      showMask() {
        this.isShow_msg = false;
        this.msg = "";
        this.isValid = true;
      },
      //返回上一页
      go_back() {
        this.$router.go(-1);
      }
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    }
  }
</script>

<style scoped>
  #register {
    width: 100%;
    height: 100%;
    background-image: url('/static/img/bg.png');
    background-size: cover;
    position: relative;
  }

  #register .mask {
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

  #register .error-mask {
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
    text-align: center;
  }

  .reg-head {
    padding: 20px 13px;
    position: relative;
    text-align: center;
    color: #fff;
    font-size: 24px;
  }

  .reg-head img {
    position: absolute;
    top: 23px;
    left: 13px;
    width: 11px;
    height: 19px;
  }

  .reg-head .toLogin {
    position: absolute;
    top: 25px;
    right: 10px;
    font-size: 18px;
    color: #fff;
  }

  .reg-content {
    width: 100vw;
    padding: 100px 13vw 100px 13vw;
    color: #ABB8BF;
  }

  .reg-content .reg-item {
    width: 74vw;
    height: 40px;
    background: #fff;
    border-radius: 40px;
    position: relative;
    padding: 12px 18px;
    margin-bottom: 20px;
  }

  .reg-content .error-msg {
    position: absolute;
    top: 40px;
    left: 12vw;
    height: 39px;
    background: rgba(0, 0, 0, 0.5);
    padding: 11px 15px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    z-index: 10;
  }

  .reg-content .reg-item input {
    width: -webkit-calc(74vw - 84px);
    width: -moz-calc(74vw - 84px);
    width: calc(74vw - 84px);
    height: 19px;
    margin-left: 16px;
    float: left;
  }

  .reg-content .reg-item input:focus {
    -webkit-box-shadow: 0 0 5px #fff;
    -moz-box-shadow: 0 0 5px #fff;
    box-shadow: 0 0 5px #fff;
    border-color: #fff;
    background: #fff;
  }

  .reg-content .reg-item .username-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_account.png");
    background-size: cover;
    float: left;
  }

  .reg-content .reg-item .password-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_password.png");
    background-size: cover;
    float: left;
  }

  .reg-content .reg-item .password {
    width: -webkit-calc(74vw - 93px);
    width: -moz-calc(74vw - 93px);
    width: calc(74vw - 93px);
  }

  .reg-content .reg-item .close-icon {
    display: block;
    width: 17px;
    height: 12px;
    background-image: url("/static/img/ico_ice_up_2.png");
    background-size: cover;
    float: left;
    margin-top: 2px;
    margin-left: 5px;
  }

  .reg-content .reg-item .open-icon {
    display: block;
    width: 17px;
    height: 12px;
    background-image: url("/static/img/ico_ice_down_2.png");
    background-size: cover;
    float: left;
    margin-top: 2px;
    margin-left: 5px;
  }

  .reg-content .reg-item .phone-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_phone_2.png");
    background-size: cover;
    float: left;
  }

  .reg-content .reg-item .phoneCode-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_protect.png");
    background-size: cover;
    float: left;
  }

  .reg-content .reg-item .phoneCode {
    width: -webkit-calc(74vw - 170px);
    width: -moz-calc(74vw - 170px);
    width: calc(74vw - 170px);
    float: left;
  }

  .reg-content .reg-item .phoneCode-info {
    width: 100px;
    position: absolute;
    top: 8px;
    right: 10px;
  }

  .reg-content .reg-item .phoneCode-info .line {
    display: block;
    width: 1px;
    height: 24px;
    /*position: absolute;*/
    /*top: 1px;*/
    /*right: 90px;*/
    background: #ABB8BF;
  }

  .reg-content .reg-item .phoneCode-info .getCode {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #6197F8;
  }

  .reg-content .reg-item .phoneCode-info .disabled {
    color: #ABB8BF;
  }

  .reg-content .reg-item .code-icon {
    display: block;
    width: 19px;
    height: 19px;
    background-image: url("/static/img/ico_protect.png");
    background-size: cover;
    float: left;
  }

  .reg-content .reg-item .code {
    width: -webkit-calc(74vw - 150px);
    width: -moz-calc(74vw - 150px);
    width: calc(74vw - 150px);
    float: left;
  }

  .reg-content .reg-item .identify-code {
    margin-top: -10px;
    margin-left: 18px;
    height: 40px;
    line-height: 40px;
    float: left;
  }

  .reg-content .reg-item .identify-code img {
    width: 60px;
    height: 35px;
  }

  .reg-content .reg-btn {
    width: 74vw;
    height: 40px;
    background: #55AAFF;
    border-radius: 40px;
    padding: 12px 18px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin-top: 45px;
  }

  .reg-footer {
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
