<template>
  <div class="header">
    <div class="header-info">
      <img src="/static/img/head.png" alt="头像">
      <div class="h-center">
        <div class="unAgentUser" v-if="user_type==1">
          <div class="name-row">
            <div class="username">{{username}}</div>
            <div class="vip">普通会员</div>
          </div>
          <div class="uid-row">
            UID:<span class="code">{{user_id}}</span>
          </div>
        </div>
        <div class="agentUser" v-else>
          <div class="name-row">
            <div class="username">{{username}}</div>
          </div>
          <div class="uid-row">
            UID:<span class="code">{{user_id}}</span>
          </div>
          <div class="user-status">
            <div class="small-button active">代理</div>
            <div class="small-button">离线</div>
            <div class="small-button active">正常</div>
          </div>
        </div>
      </div>
      <div class="toMySet" @click="toComponent('mySet')">
        <div class="more-page"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-header",
    props: ['username', 'user_id', 'user_type'],
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">
  .header {
    height: 150px;
    width: 100%;
    background: url("/static/img/head-bg.png");
    background-size: cover;
    border-radius: 10px;
    margin-bottom: 17px;

    .header-info {
      height: 150px;
      width: 100%;
      padding: 45px 21px 40px 22px;
      position: relative;
      color: #fff;

      img {
        width: 62px;
        height: 62px;
        float: left;
      }

      .h-center {
        float: left;
        margin-left: 14px;

        .name-row {
          margin-top: 10px;
          .username {
            display: inline-block;
            font-size: 18px;
            margin-right: 10px;
          }

          .vip {
            display: inline-block;
            font-size: 14px;
            background: #FFA955;
            border-radius: 10px;
            text-align: center;
            padding: 3px 8px;
          }
        }

        .uid-row {
          margin-top: 10px;
          font-size: 14px;
          .code {
            margin-left: 10px;
          }
        }

        .user-status {
          margin-top: 15px;
          .small-button {
            display: inline-block;
            width: 52px;
            height: 20px;
            border-radius: 50px;
            background: #757584;
            color: #ffffff;
            text-align: center;
            padding: 3px 8px;
            font-size: 8px;
            &.active {
              background: #FFA955;
            }
          }
        }

        .agentUser {
          .name-row {
            margin-top: 0px;
          }
        }
      }

      .toMySet {
        position: absolute;
        top: 50px;
        right: 5px;
        display: block;
        width: 50px;
        height: 50px;
        padding: 20px;
        .more-page {
          width: 7px;
          height: 12px;
          background-image: url('/static/img/wind .png');
          background-size: cover;
        }
      }

    }

  }
</style>
