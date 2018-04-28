<template>
  <div id="home">
    <myHeader :username="username" :user_id="user_id" :user_type="user_type"></myHeader>
    <myContent :user_type="user_type"></myContent>
    <iFooter v-bind:isMy="true"></iFooter>
  </div>
</template>

<script>
  import myHeader from '@/components/my/myHeader'
  import myContent from '@/components/my/myContent'
  import iFooter from '@/components/footer/iFooter'
  // import {getCookie} from "/static/js/util";
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "my",
    data() {
      return {
        username: '',
        user_id: '',
        user_type: '',
        // portrait:'',头像
        login_ip: ''
      }
    },
    created() {
      this.getUserInfo();
    },
    components: {
      'myHeader': myHeader,
      'myContent': myContent,
      'iFooter': iFooter
    },
    methods: {
      getUserInfo: function () {
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        var session = getLocalStorage("session");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`/api/v1/userdata/r/user_info/${user_id}/${username}?session=${session}`)
            .then(res => {
              var resData=res.data;
              if (res.data.success == true) {
                this.username = resData.data.username;
                this.user_id = resData.data.user_id;
                this.user_type = resData.data.user_type;
                // this.portrait=resData.data.portrait;
                this.login_ip = resData.data.login_ip;
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              console.log(err)
              this.$router.push({path: '/login'})
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #home {
    height: 100%;
    background-color: #F7FBFF;
    overflow: auto;
    padding: 8px 10px;
  }
</style>
