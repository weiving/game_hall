<template>
  <div id="updateNick" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">我的昵称</div>
    </div>
    <div class="page-content">
      <div class="row">
        <input type="text" class="nickname" v-model="nickname" placeholder="这个家伙很懒，什么都没留下">
      </div>
      <div class="row-btn">
        <div class="sure-btn" @click="update">确认修改</div>
      </div>
    </div>
    <div class="mask" v-if="isShow_msg" @click="showMask"></div>
    <div class="mask-text" v-if="isShow_msg" @click="showMask">{{msg}}</div>
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



</style>
