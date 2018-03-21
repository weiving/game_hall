<template>
  <div id="setPhone" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">绑定手机</div>
    </div>
    <div class="page-content">
      <div class="set-body">
        <div class="row">
          <input type="text" class="phone" v-model="phone" placeholder="请输入手机号">
          <div class="getBtn" @click="send" :class="{disabled:isDisabled}">{{text}}</div>
        </div>
        <div class="row last">
          <input type="text" class="code" v-model="code" placeholder="请输入验证码">
        </div>
        <div class="default-btn" @click="update" :class="{active:phone.trim().length>0&&code.trim().length>0}">
          <p>确认绑定</p>
        </div>
      </div>
    </div>
    <div class="mask" v-if="isShow_msg" @click="showMask"></div>
    <div class="mask-text" v-if="isShow_msg" @click="showMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

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
        isShow_msg: false
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo: function () {
        var session = getLocalStorage("session");
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/v1/userdata/r/user_info/${user_id}/${username}?session=${session}`)
            .then(res => {
              var resData = res.data;
              console.log('手机号', resData);
              if (resData.success == true) {
                if (resData.data.qq != undefined && resData.data.qq != '') {
                  this.phone = resData.data.phone;
                }
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              console.log(err)
              this.$router.push({path: '/login'})
            })
        }
      },
      send() {
        if (!this.isDisabled) {
          var params = new URLSearchParams();
          params.append("phone", this.phone);
          this.$http
            .post(`${this.$api}/v1/text_msg`, params)
            .then(res => {
              var resData = res.data;
              console.log('验证码', resData.msg);
              if (resData.success == true) {
                this.isDisabled = true;
                setTimeout(this.run, 1000);
              }
            }).catch(err => {
            console.log(err)
          })
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
      update() {
        var phValid = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        // var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == '' || this.phone == undefined) {
          this.isShow_msg = true;
          this.msg = "请输入手机号码~";
          return;
        } else if (!phValid.test(this.phone)) {
          this.isShow_msg = true;
          this.msg = "请输入正确的手机号码~";
          return;
        } else if (this.code == '' || this.code == undefined) {
          this.isShow_msg = true;
          this.msg = "请输入验证码~";
          return;
        } else {
          var session = getLocalStorage("session");
          var user_id = getLocalStorage("user_id");
          var username = getLocalStorage("username");

          var params = new URLSearchParams();
          params.append("phone", this.phone);
          params.append("code", this.code);

          this.$http
            .post(`${this.$api}/v1/userdata/w/bind_phone/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              console.log('手机', resData);
              if (resData.success == true) {
                this.isShow_msg = true;
                this.msg = resData.msg;
                var _this = this
                setTimeout(function () {
                  _this.isShow_msg = false;
                  _this.msg = '';
                  _this.$root.Bus.$emit('toggleComponent', 'mySet')
                }, 500)
              } else {
                this.isShow_msg = true;
                this.msg = resData.msg;
              }
            })
            .catch(err => {
              this.isShow_msg = true;
              this.msg = err.data.msg;
            })
        }
      },
      showMask() {
        this.isShow_msg = false;
        this.msg = '';
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


</style>
