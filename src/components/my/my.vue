<template>
  <div id="home">
    <myHeader :user="user" :user_id="user_id"></myHeader>
    <myContent :login_ip="login_ip"></myContent>
    <iFooter v-bind:isMy="true"></iFooter>
  </div>
</template>

<script>
  import myHeader from '@/components/my/myHeader'
  import myContent from '@/components/my/myContent'
  import iFooter from '@/components/footer/iFooter'
  // import {getCookie} from "/static/js/util";
  import {getCookie} from "../../../static/js/util";

  export default {
    name: "my",
    data() {
      return {
        user: '',
        user_id: '',
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
        var session = getCookie("session");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/user/user_info?session=${session}`)
            .then(res => {
              console.log(res)
              if (res.data.success == 1) {
                this.user = res.data.user;
                this.user_id = res.data.user_id;
                // this.portrait=res.data.portrait;
                this.login_ip = res.data.login_ip;
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

<style scoped>
  #home {
    height: 100%;
    background-color: #F7FBFF;
    overflow: auto;
    padding: 8px 10px;
  }
</style>
