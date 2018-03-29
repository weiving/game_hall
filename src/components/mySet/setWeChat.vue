<template>
  <div id="setWeChat" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">绑定微信</div>
    </div>
    <div class="page-content">
      <div class="set-body">
        <div class="row last">
          <input type="text" class="WeChat" v-model="WeChat" placeholder="这个家伙很懒，什么都没留下">
        </div>
        <div class="default-btn" @click="update" :class="{active:WeChat.trim().length>0}">
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
    name: "set-we-chat",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        session: getLocalStorage("session"),
        user_id: getLocalStorage("user_id"),
        username: getLocalStorage("username"),
        WeChat: '',
        msg: '',
        isShow_msg: false,
      }
    },
    methods: {
      getUserInfo: function () {
        if (this.session == '' || this.session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/v1/userdata/r/user_info/${this.user_id}/${this.username}?session=${this.session}`)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                if (resData.data.weixin != undefined && resData.data.weixin != '') {
                  this.WeChat = resData.data.weixin;
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
        if (this.WeChat == '' || this.WeChat == undefined) {
          this.isShow_msg = true;
          this.msg = "微信号不能为空~";
          return;
        } else {
          var params = new URLSearchParams();
          params.append('weixin', this.WeChat);
          var that = this;
          this.$http
            .post(`${this.$api}/v1/userdata/w/bind_weixin/${this.user_id}/${this.username}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                this.isShow_msg = true;
                this.msg = resData.msg;
                setTimeout(function () {
                  that.$root.Bus.$emit('toggleComponent', 'mySet')
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
