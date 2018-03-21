<template>
  <div id="mySet" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">我的</div>
    </div>
    <div class="page-content">
      <div class="mySet-row">
        <div class="row">
          <img src="/static/img/Head01.png" class="head01-icon" alt="我的头像">
          <span>我的头像</span>
          <img src="/static/img/head.png" class="head-icon" alt="头像">
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/Edition.png" class="head01-icon" alt="用户昵称">
          <span>用户昵称</span>
          <div class="next" @click="toComponent('updateNick')">
            <span class="username">{{nickname}}</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="mySet-row">
        <div class="row">
          <img src="/static/img/phone.png" class="head01-icon" alt="绑定手机">
          <span>绑定手机</span>
          <div class="next" @click="toComponent('setPhone')">
            <span class="text-red" v-show="phone.length>0">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/qq-icon.png" class="head01-icon" alt="绑定QQ">
          <span>绑定QQ</span>
          <div class="next" @click="toComponent('setQQ')">
            <span class="text-red" v-show="qq.length>0">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/WeChat-icon.png" class="head01-icon" alt="绑定微信">
          <span>绑定微信</span>
          <div class="next" @click="toComponent('setWeChat')">
            <span class="text-red" v-show="weixin.length>0">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/mail-icon.png" class="head01-icon" alt="绑定邮箱">
          <span>绑定邮箱</span>
          <div class="next" @click="toComponent('setEmail')">
            <span class="text-red" v-show="email.length>0">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/bank-icon.png" class="head01-icon" alt="绑定银行卡">
          <span>绑定银行卡</span>
          <div class="next" @click="toComponent('manageCard')">
            <span class="text-red">3张</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="mySet-row">
        <div class="row">
          <img src="/static/img/Validation.png" class="head01-icon" alt="谷歌验证">
          <span>谷歌验证</span>
          <div class="next" @click="toGValidate()">
            <span class="text-red" v-show="has_gsecret">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="mySet-row">
        <div class="row">
          <img src="/static/img/modify.png" class="head01-icon" alt="修改密码">
          <span>修改密码</span>
          <div class="next" @click="toComponent('updatePwd')">
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="default-btn active" @click="esc_login">
        <p>退出登陆</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {delCookie, getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "my-set",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        portrait: '',
        nickname: '',
        phone: '',
        qq: '',
        weixin: '',
        email: '',
        has_gsecret: '',
      }
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
              if (resData.success == true) {
                // this.portrait=res.data.portrait;
                console.log('用户信息', resData);
                if (resData.data.nickname != undefined && resData.data.nickname != '') {
                  this.nickname = resData.data.nickname;
                }
                if (resData.data.phone != undefined && resData.data.phone != '') {
                  this.phone = resData.data.phone;
                }
                if (resData.data.qq != undefined && resData.data.qq != '') {
                  this.qq = resData.data.qq;
                }
                if (resData.data.weixin != undefined && resData.data.weixin != '') {
                  this.weixin = resData.data.weixin;
                }
                if (resData.data.email != undefined && resData.data.email != '') {
                  this.email = resData.data.email;
                }
                this.has_gsecret = resData.data.gsecret;
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              this.$router.push({path: '/login'})
            })
        }
      },
      esc_login: function () {
        var session = getLocalStorage("session");
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        this.$http
          .post(`${this.$api}/v1/userdata/w/logout/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
            } else {
            }
          })
          .catch(err => {
          });
        removeLocalStorage("session")
        removeLocalStorage("user_id")
        removeLocalStorage("username")
        removeLocalStorage("user_type")
        removeLocalStorage("showAssets")

        delCookie("session")
        delCookie("user_id")
        delCookie("username")
        delCookie("user_type")
        delCookie("showAssets")

        this.$router.push({path: '/login'})
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      toGValidate() {
        if (!this.has_gsecret) {
          this.$root.Bus.$emit('toggleComponent', 'gValidate');
        }
      }
    }
  }
</script>

<style scoped>

</style>
