<template>
  <div id="updatePwd" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">修改登录密码</div>
    </div>
    <div class="page-content">
      <div class="set-body">
        <div class="row">
          <input type="password" class="old-password" v-model="oldPwd" placeholder="请输入旧登录密码">
        </div>
        <div class="row">
          <input type="password" class="new-password" v-model="newPwd" placeholder="请输入新登录密码">
        </div>
        <div class="row last">
          <input type="password" class="again-password" v-model="againPwd" placeholder="再次输入新登录密码">
        </div>
        <div class="default-btn" @click="update"
             :class="{active:oldPwd.trim().length>0&&newPwd.trim().length>0&&againPwd.trim().length>0}">
          <p>确认修改</p>
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
    name: "update-pwd",
    data: function () {
      return {
        oldPwd: "",
        newPwd: "",
        againPwd: '',
        msg: "",
        isShow_msg: false,
      }
    },
    methods: {
      showMask() {
        this.isShow_msg = false;
        this.msg = "";
      },
      update() {
        if (this.oldPwd == '' || this.oldPwd == undefined) {
          this.isShow_msg = true;
          this.msg = "旧密码不能为空~";
          return;
        } else if (this.newPwd == '' || this.newPwd == undefined) {
          this.isShow_msg = true;
          this.msg = "新密码不能为空~";
          return;
        } else if (this.againPwd == '' || this.againPwd == undefined) {
          this.isShow_msg = true;
          this.msg = "再次输入新密码~";
          return;
        } else if (this.againPwd != this.newPwd) {
          this.isShow_msg = true;
          this.msg = "两次密码不一致~";
          return;
        } else {
          var params = new URLSearchParams();
          params.append('old_password', this.oldPwd);
          params.append('new_password', this.newPwd);
          var _this = this;
          var session = getLocalStorage("session");
          var user_id = getLocalStorage("user_id");
          var username = getLocalStorage("username");
          this.$http
            .post(`/api/v1/userdata/w/reset_password/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                _this.isShow_msg = true;
                _this.msg = resData.msg;
                setTimeout(function () {
                  _this.$root.Bus.$emit('toggleComponent', 'mySet')
                }, 500)
              } else {
                _this.isShow_msg = true;
                _this.msg = resData.msg;
              }
            })
        }

      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">

</style>
