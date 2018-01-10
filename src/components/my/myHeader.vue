<template>
  <div class="header">
    <div class="header-info">
      <img src="/static/img/head.png" alt="头像">
      <div class="h-center">
        <div class="name-row">
          <div class="username">{{user}}</div>
          <div class="vip">普通会员</div>
        </div>
        <div class="uid-row">
          UID:<span class="code">{{user_id}}</span>
        </div>
      </div>
      <router-link to="/mySet" class="toMyset">
        <div class="more-page"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-header",
    props: ['user', 'user_id']
  }
</script>

<style scoped lang="less">
  .header {
    height: 150px;
    width: 100%;
    background: #5D97F9;
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
      }

      .toMyset {
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
