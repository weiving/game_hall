<template>
  <div id="updatePwd" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">修改密码</div>
    </div>
    <div class="page-content">
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
  import {getLocalStorage} from "../../../static/js/util";

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
          var session = getLocalStorage("session");
          this.$http
            .post(`${this.$api}/user/reset_password?session=${session}`, params)
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
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">

</style>
