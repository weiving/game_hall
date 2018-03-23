<template>
  <div id="setName" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">真实姓名</div>
    </div>
    <div class="page-content">
      <div class="set-body">
        <div class="row last">
          <input type="text" class="name" v-model="name" placeholder="这个家伙很懒，什么都没留下">
        </div>
        <div class="default-btn" @click="update" :class="{active:name.trim().length>0}">
          <p>确认修改</p>
        </div>
      </div>
    </div>
    <div class="mask" v-if="isShow_msg" @click="showMask"></div>
    <div class="mask-text" v-if="isShow_msg" @click="showMask">
      <span>{{msg}}</span>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "set-name",
    created() {
      this.getUserInfo();
    },
    data() {
      return {
        name: '',
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
              console.log('resDat', resData)
              if (resData.success == true) {
                if (resData.data.name != undefined && resData.data.name != '') {
                  this.name = resData.data.name;
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
        if (this.name == '' || this.name == undefined) {
          this.isShow_msg = true;
          this.msg = "昵称不能为空~";
          return;
        } else {
          var params = new URLSearchParams();
          params.append('name', this.name);

          var _this = this;
          var session = getLocalStorage("session");
          var user_id = getLocalStorage("user_id");
          var username = getLocalStorage("username");
          this.$http
            .post(`${this.$api}/v1/userdata/w/bind_name/${user_id}/${username}?session=${session}`, params)
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

<style scoped>

</style>
