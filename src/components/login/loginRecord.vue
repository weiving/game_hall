<template>
  <div id="loginRecord">
    <div class="recode-head">
      <router-link to="/my" class="toMy">
        <img src="/static/img/left.png"/>
      </router-link>
      <div class="recode-title">登录记录</div>
    </div>
    <div class="recode-content">
      <div class="recode-item" v-for="(item,index) in recordList">
        <div class="r-main">
          <div class="log-address">{{item.region}}</div>
          <div class="log-ip">{{item.ip}}</div>


        </div>
        <div class="r-sub">
          <div class="log-name">登录时间</div>
          <div class="log-time">{{ item.create_at | formatDate }}</div>

        </div>
      </div>
      <!--<div class="recode-item">-->
      <!--<div class="r-main">-->
      <!--<div class="log-name">罗妹也疯狂</div>-->
      <!--<div class="log-time">2017-09-20 19:34:40</div>-->
      <!--</div>-->
      <!--<div class="r-sub">-->
      <!--<div class="log-address">福建福州</div>-->
      <!--<div class="log-ip">192.168.0.1</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "login-record",
    created() {
      this.getLoginRecord();
    },
    data() {
      return {
        recordList: {}
      }
    },
    filters: {
      formatDate(time) {
        // var date = new Date(time);
        // return formatDate(date, 'yyyy-MM-dd hh:mm');
        return time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8) + ' ' + time.substring(8, 10) + ':' + time.substring(10, 12) + ':' + time.substring(12, 14)
      }
    },
    methods: {
      getLoginRecord: function () {
        var session = getLocalStorage('session');
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/user/login_log?session=${session}`)
            .then(res => {
              if (res.data.success == 1) {
                console.log(res.data)
                this.recordList = res.data.data;
              } else {
                console.log(res.message)
              }
            })
            .catch(err => {
              console.log(err.message)
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #loginRecord {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    letter-spacing: 1px;

    .recode-head {
      width: 100vw;
      height: 50px;
      line-height: 50px;
      background: #5D97F9;
      color: #fff;
      text-align: center;
      position: relative;
      font-size: 20px;

      .toMy {
        position: absolute;
        top: 5px;
        left: 0px;
        width: 40px;
        height: 40px;
        img {
          width: 11px;
          height: 19px;
          vertical-align: text-top;
        }
      }
    }

    .recode-content {
      flex: 1;
      padding: 0 18px 10px 18px;
      overflow: auto;

      .recode-item {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #EBEBEB;

        .r-main {
          width: 50%;
          height: 50px;
          float: left;

          .log-address {
            margin-top: 10px;
          }

          .log-ip {
            margin-top: 10px;
            color: #A0A0A0;
          }
        }

        .r-sub {
          width: 50%;
          height: 50px;
          float: left;
          text-align: right;

          .log-name {
            margin-top: 10px;
          }

          .log-time {
            margin-top: 10px;
            color: #A0A0A0;
          }
        }

      }

    }
  }


</style>
