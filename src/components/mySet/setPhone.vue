<template>
  <div id="setPhone">
    <div class="setPhone-head">
      <div class="toMySet" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">绑定手机</div>
    </div>
    <div class="setPhone-content">
      <div class="row">
        <input type="text" class="phone" v-model="phone" placeholder="请输入手机号">
        <div class="getBtn" @click="send" :class="{disabled:isDisabled}">{{text}}</div>
        <div class="error-msg" v-if="isShow_phone_msg">{{msg}}</div>
      </div>
      <div class="row last">
        <input type="text" class="code" v-model="code" placeholder="请输入验证码">
        <div class="error-msg" v-if="isShow_code_msg">{{msg}}</div>
      </div>
      <div class="row-btn">
        <div class="sure-btn" @click="update">确认绑定</div>
      </div>
      <div class="mask" v-if="isShow_msg" @click="showMask"></div>
      <div class="error-mask" v-if="isShow_msg" @click="showMask">{{msg}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "set-phone",
    data() {
      return {
        phone: '',
        code: '',
        isDisabled: false,
        time: 0,
        second: 60,
        msg: '',
        isShow_phone_msg: false,
        isShow_code_msg: false,
        isValid: true,
        isShow_msg: false
      }
    },
    methods: {
      send() {
        if (!this.isDisabled) {
          var params = new URLSearchParams();
          params.append("phone", this.phone)
          this.$http
            .post(`${this.$api}/text_msg`, params)
            .then(res => {
              console.log(res)
              this.isDisabled = true;
              setTimeout(this.run, 1000);
            }).catch(err => {
            console.log(err)
          })
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
      update() {
        if (this.isValid) {
          var phValid = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

          if (this.phone == '' || this.phone == undefined) {
            this.isShow_phone_msg = true;
            this.msg = "请输入手机号码~";
            return this.isValid = false;
          } else if (!phValid.test(this.phone)) {
            this.isShow_phone_msg = true;
            this.msg = "请输入正确的手机号码~";
            return this.isValid = false;
          } else if (this.code == '' || this.code == undefined) {
            this.isShow_code_msg = true;
            this.msg = "请输入验证码~";
            return this.isValid = false;
          }
        }
        if (this.isValid) {
          var params = new URLSearchParams();
          params.append("phone", this.phone)
          params.append("code", this.code)
          this.$http
            .post(`${this.$api}/user/bind_phone`, params)
            .then(res => {
              console.log(res);
              if (res.data.success == 1) {
                this.isShow_msg = false;
                this.msg = res.data.message;
                var _this = this
                setTimeout(function () {
                  _this.isShow_msg = false;
                  _this.msg = '';
                  // _this.$router.push({path: '/mySet'});
                  _this.$root.Bus.$emit('toggleComponent', 'mySet')
                }, 2000)
              } else {
                this.isShow_msg = true;
                this.msg = err.data.message;
                var _this = this;
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
            })
        }

      },
      showMask() {
        this.isShow_msg = false;
        this.msg = '';
        this.isValid = true;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    }
  }
</script>

<style scoped lang="less">
  #setPhone {
    width: 100%;
    height: 100%;
    background: #F7FBFF;
    display: flex;
    flex-direction: column;

    .setPhone-head {
      width: 100vw;
      height: 50px;
      line-height: 50px;
      background: #5D97F9;
      color: #fff;
      text-align: center;
      position: relative;
      font-size: 20px;

      .toMySet {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 60px;
        height: 50px;

        img {
          width: 11px;
          height: 19px;
        }
      }
    }

    .setPhone-content {
      width: 100vw;
      flex: 1;
      font-size: 16px;

      .row {
        width: 100vw;
        height: 60px;
        line-height: 60px;
        background: #fff;
        border-bottom: 1px solid #EBEBEB;
        position: relative;

        &.last {
          border: none;
          box-shadow: 0 5px 8px #F0F8FF;
        }

        input {
          width: -webkit-calc(~"100vw - 30px");
          width: calc(~"100vw - 30px");
          height: 40px;
          line-height: 40px;
          margin-left: 15px;
          margin-right: 15px;
        }

        .phone {
          width: -webkit-calc(~"100vw - 130px");;
          width: calc(~"100vw - 130px");
        }

        .getBtn {
          position: absolute;
          top: 0;
          right: 10px;
          color: #5D97F9;
        }
      }

      .row-btn {
        width: 100vw;
        margin: 40px 10px;

        .sure-btn {
          width: -webkit-calc(~"100vw - 20px");
          width: calc(~"100vw - 20px");
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          background: #5D97F9;
          border-radius: 6px;
          &.active {
            background: #CCCCCC;
          }
        }

      }

    }

  }


</style>
