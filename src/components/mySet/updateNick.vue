<template>
  <div id="updateNick">
    <div class="updateNick-head">
      <div class="toMySet" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">我的昵称</div>
    </div>
    <div class="updateNick-content">
      <div class="row">
        <input type="text" class="nickname" v-model="nickname" placeholder="这个家伙很懒，什么都没留下">
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
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "update-nick",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        nickname: '',
        msg: '',
        isShow_msg: false,
        isValid: true
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
      update: function () {
        if (this.isValid) {
          if (this.nickname == '' || this.nickname == undefined) {
            this.isShow_msg = true;
            this.msg = "昵称不能为空~";
            return this.isValid = false;
          }
          var params = new URLSearchParams();
          params.append('nickname', this.nickname);

          var _this = this;
          var session = getLocalStorage("session");
          this.$http
            .post(`${this.$api}/user/edit_nickname?session=${session}`, params)
            .then(res => {
              if (res.data.success == 1) {
                _this.isShow_msg = true;
                _this.msg = res.data.message;
                setTimeout(function () {
                  // _this.$router.push({path: '/mySet'})
                  _this.$root.Bus.$emit('toggleComponent', 'mySet')
                }, 500)
              } else {
                _this.isShow_msg = true;
                _this.msg = res.data.message;
              }
            })
        }
      },
      showMask: function () {
        this.isShow_msg = false;
        this.msg = "";
        this.isValid = true;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">
  #updateNick {
    width: 100%;
    height: 100%;
    background: #F7FBFF;
    display: flex;
    flex-direction: column;

    .updateNick-head {
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

    .updateNick-content {
      width: 100vw;
      flex: 1;
      font-size: 16px;

      .row {
        width: 100vw;
        height: 60px;
        line-height: 60px;
        background: #fff;
        box-shadow: 0 5px 8px #F0F8FF;

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
