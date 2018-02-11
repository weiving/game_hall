<template>
  <div id="home">
    <myHeader :user="user" :user_id="user_id" :user_type="user_type"></myHeader>
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
        user: '',
        user_id: '',
        user_type:'',
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
        var session = getLocalStorage("session");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/user/user_info?session=${session}`)
            .then(res => {
              // console.log(res)
              if (res.data.success == 1) {
                this.user = res.data.username;
                this.user_id = res.data.user_id;
                this.user_type=res.data.user_type;
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

</style>
