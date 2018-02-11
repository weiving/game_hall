<template>
  <div id="mySet" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">我的</div>
    </div>
    <div class="page-content">
      <div class="my-first">
        <div class="row">
          <img src="/static/img/Head01.png" class="head01-icon" alt="我的头像">
          <span>我的头像</span>
          <img src="/static/img/head.png" class="head-icon" alt="头像">
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/Edition.png" class="head01-icon" alt="用户昵称">
          <span>用户昵称</span>
          <div class="setName" @click="toComponent('updateNick')">
            <span class="username">{{nickname}}</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="my-sub">
        <div class="row">
          <img src="/static/img/phone.png" class="head01-icon" alt="绑定手机">
          <span>绑定手机</span>
          <div class="next" @click="toComponent('setPhone')">
            <span class="text-red">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <!--<div class="row">-->
          <!--<img src="/static/img/Alipay.png" class="head01-icon" alt="绑定支付宝">-->
          <!--<span>绑定支付宝</span>-->
          <!--<div class="next">-->
            <!--<img src="/static/img/wind01.png" alt="">-->
          <!--</div>-->
        <!--</div>-->
        <div class="row">
          <img src="/static/img/qq-icon.png" class="head01-icon" alt="绑定QQ">
          <span>绑定QQ</span>
          <div class="next">
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/WeChat-icon.png" class="head01-icon" alt="绑定微信">
          <span>绑定微信</span>
          <div class="next">
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/mail-icon.png" class="head01-icon" alt="绑定邮箱">
          <span>绑定邮箱</span>
          <div class="next">
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/bank-icon.png" class="head01-icon" alt="绑定银行卡">
          <span>绑定银行卡</span>
          <div class="next">
            <span class="text-red">3张</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="my-third">
        <div class="row">
          <img src="/static/img/phone.png" class="head01-icon" alt="修改密码">
          <span>修改密码</span>
          <div class="next" @click="toComponent('updatePwd')">
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="esc-login" @click="esc_login">
        <p>退出登陆</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";
  import {removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "my-set",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        portrait: '',
        nickname: '',
        phone: ''
      }
    },
    methods: {
      getUserInfo: function () {
        var session = getLocalStorage("session");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/user/user_info?session=${session}`)
            .then(res => {
              if (res.data.success == 1) {
                // this.portrait=res.data.portrait;
                if (this.nickname != undefined) {
                  this.nickname = res.data.nickname;
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
      esc_login: function () {
        removeLocalStorage("session")
        removeLocalStorage("user_id")
        removeLocalStorage("showAssets")
        // this.$router.push({path: '/login'})
        this.$root.Bus.$emit('toggleComponent', 'login')
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped>

</style>
