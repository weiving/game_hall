<template>
  <div id="setEmail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">绑定邮箱</div>
    </div>
    <div class="page-content">
      <div class="set-body">
        <div class="row last">
          <input type="text" class="email" v-model="email" placeholder="这个家伙很懒，什么都没留下">
        </div>
        <div class="default-btn" @click="update" :class="{active:email.trim().length>0}">
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
    name: "set-email",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        email: '',
        msg: '',
        isShow_msg: false,
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
                if (resData.data.email != undefined && resData.data.email != '') {
                  this.email = resData.data.email;
                }
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              console.log(err);
              this.$router.push({path: '/login'})
            })
        }
      },
      update: function () {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if (this.email == '' || this.email == undefined) {
          this.isShow_msg = true;
          this.msg = "邮箱不能为空~";
          return;
        } else if (!regEmail.test(this.email)) {
          this.isShow_msg = true;
          this.msg = "请输入正确的邮箱地址~";
          return;
        } else {
          var params = new URLSearchParams();
          params.append('email', this.email);

          var _this = this;
          var session = getLocalStorage("session");
          var user_id = getLocalStorage("user_id");
          var username = getLocalStorage("username");
          this.$http
            .post(`${this.$api}/v1/userdata/w/bind_email/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                this.isShow_msg = true;
                this.msg = resData.msg;
                setTimeout(function () {
                  _this.$root.Bus.$emit('toggleComponent', 'mySet')
                }, 500)
              } else {
                this.isShow_msg = true;
                this.msg = resData.msg;
              }
            })
        }


      },
      showMask: function () {
        this.isShow_msg = false;
        this.msg = "";
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped>

</style>
