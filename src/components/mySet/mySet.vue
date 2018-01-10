<template>
  <div id="mySet">
    <div class="mySet-head">
      <router-link to="/my" class="toMy">
        <img src="/static/img/left.png"/>
      </router-link>
      <div class="title">我的</div>
    </div>
    <div class="mySet-content">
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
          <router-link to="/updateNick" class="setName">
            <span class="username">{{nickname}}</span>
            <img src="/static/img/wind01.png" alt="">
          </router-link>
        </div>
      </div>

      <div class="my-sub">
        <div class="row">
          <img src="/static/img/phone.png" class="head01-icon" alt="绑定手机">
          <span>绑定手机</span>
          <div class="next">
            <span class="text-red">已绑定</span>
            <img src="/static/img/wind01.png" alt="">
          </div>
          <div class="row-line"></div>
        </div>
        <div class="row">
          <img src="/static/img/Alipay.png" class="head01-icon" alt="绑定支付宝">
          <span>绑定支付宝</span>
          <div class="next">
            <img src="/static/img/wind01.png" alt="">
          </div>
        </div>
      </div>

      <div class="my-third">
        <div class="row">
          <img src="/static/img/phone.png" class="head01-icon" alt="修改密码">
          <span>修改密码</span>
          <router-link to="/updatePwd">
            <div class="next">

              <img src="/static/img/wind01.png" alt="">
            </div>
          </router-link>
        </div>
      </div>

      <div class="esc-login" @click="esc_login">
        <p>退出登陆</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCookie} from "../../../static/js/util";
  import {delCookie} from "../../../static/js/util";

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
        var session = getCookie("session");
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
        delCookie("session")
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped lang="less">
  #mySet {
    width: 100%;
    height: 100%;
    background: #F7FBFF;
    display: flex;
    flex-direction: column;

    .mySet-head {
      width: 100vw;
      height: 50px;
      line-height: 50px;
      background: #5D97F9;
      color: #fff;
      text-align: center;
      position: relative;
      font-size: 20px;

      .toMy {
        position: absolute;
        top: 5px;
        left: 0px;
        width: 40px;
        height: 40px;

        img {
          width: 11px;
          height: 19px;
          vertical-align: text-top;
        }
      }

    }

    .mySet-content {
      width: 100vw;
      flex: 1;
      font-size: 16px;

      .my-first {
        width: 94vw;
        height: 120px;
        margin: 16px 3vw 0 3vw;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 0 3px 3px #F4FAFF;

        .row {
          height: 60px;
          padding: 22px 10px 0px 55px;
          position: relative;

          .row-line {
            padding-top: 22px;
            border-bottom: 1px solid #EBEBEB;
          }

          .head01-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 20px;
            left: 25px;
          }

          .head-icon {
            width: 42px;
            height: 42px;
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .setName {
            color: #999999;
            position: absolute;
            top: 0px;
            right: 10px;
            width: 190px;
            height: 60px;
            line-height: 60px;
            text-align: right;

            img {
              width: 7px;
              height: 12px;
            }
          }
        }
      }

      .my-sub {
        width: 94vw;
        height: 120px;
        margin: 16px 3vw 0 3vw;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 0 3px 3px #F4FAFF;

        .row {
          height: 60px;
          padding: 22px 10px 0px 55px;
          position: relative;

          .row-line {
            padding-top: 22px;
            border-bottom: 1px solid #EBEBEB;
          }

          .head01-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 20px;
            left: 25px;
          }

          .head-icon {
            width: 42px;
            height: 42px;
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .next {
            color: #999999;
            position: absolute;
            top: 0px;
            right: 10px;
            width: 190px;
            height: 60px;
            line-height: 60px;
            text-align: right;

            .text-red {
              color: red;
            }

            img {
              width: 7px;
              height: 12px;
            }
          }
        }
      }

      .my-third {
        width: 94vw;
        height: 60px;
        margin: 16px 3vw 0 3vw;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 0 3px 3px #F4FAFF;

        .row {
          height: 60px;
          padding: 22px 10px 0px 55px;
          position: relative;

          .head01-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 20px;
            left: 25px;
          }

          .next {
            color: #999999;
            position: absolute;
            top: 0px;
            right: 10px;
            width: 190px;
            height: 60px;
            line-height: 60px;
            text-align: right;

            img {
              width: 7px;
              height: 12px;
            }
          }
        }
      }

      .esc-login {
        width: 94vw;
        height: 40px;
        line-height: 40px;
        margin: 25px 3vw 0 3vw;
        border-radius: 10px;
        background: #5D97F9;
        color: #fff;
        text-align: center;

        a {
          color: #fff;
        }
      }
    }
  }
</style>
