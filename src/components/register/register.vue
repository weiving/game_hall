<template>
  <div id="register" class="page-wrap">
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
    <div class="mask-text" v-if="isShow_msg" @click="showMask"><span>{{msg}}</span></div>
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
        ];
      },
      vcodeFn() {
        this.$http
          .get(`${this.$api}/v1/vcode.png`)
          .then(res => {
            this.cookie_vcode = res.headers.vcode;
          })
          .catch(err => {
          });
        return this.vcode = this.$api + '/v1/vcode.png?time=' + Date.now();
      },
      send() {
        if (!this.isDisabled) {
          var phValid = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          if (this.phone == '' || this.phone == undefined) {
            this.msg = "请输入手机号码~";
            this.isShow_phone_msg = true;
            return;
          } else if (!phValid.test(this.phone)) {
            this.msg = "请输入正确的手机号码~";
            this.isShow_phone_msg = true;
            return;
          } else {
            var params = new URLSearchParams();
            params.append("phone", this.phone);
            this.$http
              .post(`${this.$api}/v1/text_msg`, params)
              .then(res => {
                console.log("res", res);
                if (res.data.success == 1) {
                  console.log(res.data.msg);
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
        this.time = this.second;
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
          return;
        } else if (!uValid.test(this.username)) {
          this.msg = "请输入5-18位(字母,数字)~";
          this.isShow_username_msg = true;
          return;
        } else if (this.password == '' || this.password == undefined) {
          this.msg = "请输入密码~";
          this.isShow_password_msg = true;
          return;
        } else if (!pValid.test(this.password)) {
          this.msg = "请输入6-20位(字母,数字)~";
          this.isShow_password_msg = true;
          return;
        } else if (this.phone == '' || this.phone == undefined) {
          this.msg = "请输入手机号码~";
          this.isShow_phone_msg = true;
          return;
        } else if (!phValid.test(this.phone)) {
          this.msg = "请输入正确的手机号码~";
          this.isShow_phone_msg = true;
          return;
        } else if (this.phoneCode == '' || this.phoneCode == undefined) {
          this.msg = "请输入手机验证码~";
          this.isShow_phoneCode_msg = true;
          return;
        } else if (this.code == '' || this.code == undefined) {
          this.msg = "请输入验证码~";
          this.isShow_code_msg = true;
          return;
        } else {

          var params = new URLSearchParams();
          params.append("username", this.username);
          params.append("password", this.password);
          params.append("phone", this.phone);
          params.append("code", this.phoneCode);
          params.append("vcode", this.code);

          this.$http
            .post(`${this.$api}/v1/register/phone?vcode=${this.cookie_vcode}`, params)
            .then(res => {
              var resData = res.data;
              console.log("resData", resData);
              if (resData.success == true) {
                this.isShow_msg = true;
                this.msg = resData.msg;
                var _this = this;
                setTimeout(function () {
                  _this.$router.push({path: '/login'})
                }, 1000)
              } else {
                this.isShow_msg = true;
                this.msg = resData.msg;
              }
            })
            .catch(err => {
              this.isShow_msg = true;
              this.msg = err.data.msg;
              var _this = this
              setTimeout(function () {
                _this.isShow_msg = false;
                this.msg = '';
              }, 1000)
            });
        }
      },

      showMask() {
        this.isShow_msg = false;
        this.msg = "";
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


