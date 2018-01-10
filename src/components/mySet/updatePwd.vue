<template>
  <div id="updatePwd">
    <div class="updatePwd-head">
      <router-link to="/mySet" class="toMySet">
        <img src="/static/img/left.png"/>
      </router-link>
      <div class="title">修改密码</div>
    </div>
    <div class="updatePwd-content">
      <div class="row">
        <input type="password" class="old-password" v-model="oldPwd" placeholder="请输入旧密码">
      </div>
      <div class="row last">
        <input type="password" class="new-password" v-model="newPwd" placeholder="请输入新密码">
      </div>
      <div class="row-btn">
        <div class="sure-btn" @click="update">确认修改</div>
      </div>
    </div>
    <div class="mask" v-if="isShow_msg" @click="showMask"></div>
    <div class="error-mask" v-if="isShow_msg" @click="showMask">{{msg}}</div>
  </div>
</template>

<script>
  import {getCookie} from "../../../static/js/util";

  export default {
    name: "update-pwd",
    data: function () {
      return {
        oldPwd: "",
        newPwd: "",
        msg: "",
        isShow_msg: false,
        isValid: true
      }
    },
    methods: {
      showMask() {
        this.isShow_msg = false;
        this.msg = "";
        this.isValid = true;
      },
      update() {
        if (this.isValid) {
          if (this.oldPwd == '' || this.oldPwd == undefined) {
            this.isShow_msg = true;
            this.msg = "旧密码不能为空~";
            return this.isValid = false;
          } else if (this.newPwd == '' || this.newPwd == undefined) {
            this.isShow_msg = true;
            this.msg = "新密码不能为空~";
            return this.isValid = false;
          }
          var params = new URLSearchParams();
          params.append('old_password', this.oldPwd);
          params.append('new_password', this.newPwd);
          var _this = this;
          var session = getCookie("session");
          this.$http
            .post(`${this.$api}/user/reset_password?session=${session}`, params)
            .then(res => {
              if (res.data.success == 1) {
                _this.isShow_msg = true;
                _this.msg = res.data.message;
                setTimeout(function () {
                  _this.$router.push({path: '/mySet'})
                }, 500)
              } else {
                _this.isShow_msg = true;
                _this.msg = res.data.message;
              }
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #updatePwd {
    width: 100%;
    height: 100%;
    background: #F7FBFF;
    display: flex;
    flex-direction: column;

    .updatePwd-head {
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

    .updatePwd-content {
      width: 100vw;
      flex: 1;
      font-size: 16px;

      .row {
        width: 100vw;
        height: 60px;
        line-height: 60px;
        background: #fff;
        border-bottom: 1px solid #EBEBEB;

        &.last {
          border: none;
          box-shadow: 0 5px 8px #F0F8FF;
        }

        input {
          width: -webkit-calc(100vw - 30px);
          width: -moz-calc(100vw - 30px);
          width: calc(100vw - 30px);
          height: 40px;
          line-height: 40px;
          margin-left: 15px;
          margin-right: 15px;
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

    .mask {
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

    .error-mask {
      position: absolute;
      top: 40%;
      left: -webkit-calc(~"(100vw - 180px) / 2");
      left: calc(~"(100vw - 180px) / 2");
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

  }
</style>
