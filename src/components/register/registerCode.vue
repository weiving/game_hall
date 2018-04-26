<template>
  <div id="registerCode" class="page-wrap">
    <div class="reg-head">
      <img src="/static/img/left.png" @click="go_back"/>
      <div class="title">推广码注册</div>
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
        <span class="phoneCode-icon"></span>
        <input type="text" class="spread_code text-red" v-model="spread_code" placeholder="推广码" disabled>
      </div>
      <div class="reg-btn" v-on:click="codeReg">
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
  export default {
    name: "register-code",
    data() {
      return {
        username: '',
        password: '',
        password_type: "password",
        isShowPwd: false,

        isShow_username_msg: '',
        isShow_password_msg: '',
        spread_code: '',
        isShow_msg: '',
        msg: ''
      }
    },
    created() {
      this.getCode();
    },
    methods: {
      getCode() {
        this.spread_code = this.$route.query.code;
      },
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
        ];
      },

      codeReg() {
        //用户名正则，5到18位（字母，数字）
        var uValid = /^[a-zA-Z0-9]{5,18}$/;
        //密码正则，6到20位（字母，数字）
        var pValid = /^[a-zA-Z0-9]{6,20}$/;

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
        } else {
          var params = new URLSearchParams();
          params.append("username", this.username);
          params.append("password", this.password);
          params.append("spread_code", this.spread_code);

          this.$http
            .post(`${this.$api}/v1/register/invite`, params)
            .then(res => {
              console.log('请求', 11111);
              var resData = res.data;
              console.log("resData", resData);
              if (resData.success == true) {
                console.log('成功', 11111);
                this.isShow_msg = true;
                this.msg = resData.msg;
                var _this = this;
                setTimeout(function () {
                  _this.$router.push({path: '/login'})
                }, 1000)
              } else {
                console.log('失败', 22222);

                this.isShow_msg = true;
                this.msg = resData.msg;

              }
            })
            .catch(err => {
              this.isShow_msg = true;
              this.msg = err.data.msg;
              var _this = this;
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
        this.isValid = true;
      },
      //返回上一页
      go_back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  #registerCode {
    width: 100%;
    height: 100%;
    background-image: url('/static/img/bg.png');
    background-size: cover;
    position: relative;
    z-index: 61;

    .reg-head {
      padding: 20px 13px;
      position: relative;
      text-align: center;
      color: #fff;
      font-size: 24px;

      img {
        position: absolute;
        top: 23px;
        left: 13px;
        width: 11px;
        height: 19px;
      }

      .toLogin {
        position: absolute;
        top: 25px;
        right: 10px;
        font-size: 18px;
        color: #fff;
      }
    }

    .reg-content {
      width: 100vw;
      padding: 100px 13vw 100px 13vw;
      color: #ABB8BF;

      .reg-item {
        width: 74vw;
        height: 40px;
        background: #fff;
        border-radius: 40px;
        position: relative;
        padding: 12px 18px;
        margin-bottom: 20px;

        input {
          width: -webkit-calc(~"74vw - 84px");
          width: -moz-calc(~"74vw - 84px");
          width: calc(~"74vw - 84px");
          height: 19px;
          margin-left: 16px;
          float: left;
          font-size: 16px;
        }

        input:focus {
          -webkit-box-shadow: 0 0 5px #fff;
          -moz-box-shadow: 0 0 5px #fff;
          box-shadow: 0 0 5px #fff;
          border-color: #fff;
          background: #fff;
        }

        .username-icon {
          display: block;
          width: 19px;
          height: 19px;
          background-image: url("/static/img/ico_account.png");
          background-size: cover;
          float: left;
        }

        .password-icon {
          display: block;
          width: 19px;
          height: 19px;
          background-image: url("/static/img/ico_password.png");
          background-size: cover;
          float: left;
        }

        .password {
          width: -webkit-calc(~"74vw - 93px");
          width: -moz-calc(~"74vw - 93px");
          width: calc(~"74vw - 93px");
        }

        .close-icon {
          display: block;
          width: 17px;
          height: 12px;
          background-image: url("/static/img/ico_ice_up_2.png");
          background-size: cover;
          float: left;
          margin-top: 2px;
          margin-left: 5px;
        }

        .open-icon {
          display: block;
          width: 17px;
          height: 12px;
          background-image: url("/static/img/ico_ice_down_2.png");
          background-size: cover;
          float: left;
          margin-top: 2px;
          margin-left: 5px;
        }

        .phone-icon {
          display: block;
          width: 19px;
          height: 19px;
          background-image: url("/static/img/ico_phone_2.png");
          background-size: cover;
          float: left;
        }

        .phoneCode-icon {
          display: block;
          width: 19px;
          height: 19px;
          background-image: url("/static/img/ico_protect.png");
          background-size: cover;
          float: left;
        }

        .phoneCode {
          width: -webkit-calc(~"74vw - 170px");
          width: -moz-calc(~"74vw - 170px");
          width: calc(~"74vw - 170px");
          float: left;
        }

        .phoneCode-info {
          width: 110px;
          position: absolute;
          top: 8px;
          right: 10px;

          .line {
            display: block;
            width: 1px;
            height: 24px;
            background: #ABB8BF;
          }

          .getCode {
            position: absolute;
            top: 5px;
            right: 10px;
            color: #6197F8;
          }

          .disabled {
            color: #ABB8BF;
          }
        }

        .code-icon {
          display: block;
          width: 19px;
          height: 19px;
          background-image: url("/static/img/ico_protect.png");
          background-size: cover;
          float: left;
        }

        .code {
          width: -webkit-calc(~"74vw - 150px");
          width: -moz-calc(~"74vw - 150px");
          width: calc(~"74vw - 150px");
          float: left;
        }

        .identify-code {
          margin-top: -10px;
          margin-left: 18px;
          height: 40px;
          line-height: 40px;
          float: left;
          img {
            width: 60px;
            height: 35px;
          }
        }

      }

      .error-msg {
        position: absolute;
        top: 40px;
        left: 12vw;
        height: 39px;
        background: rgba(0, 0, 0, 0.5);
        padding: 11px 15px;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        z-index: 10;
      }

      .reg-btn {
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

  }
</style>
