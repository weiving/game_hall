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
              console.log('请求',11111);
              var resData = res.data;
              console.log("resData", resData);
              if (resData.success == true) {
                console.log('成功',11111);
                this.isShow_msg = true;
                this.msg = resData.msg;
                var _this = this;
                setTimeout(function () {
                  _this.$router.push({path: '/login'})
                }, 1000)
              } else {
                console.log('失败',22222);

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

<style scoped>

</style>
