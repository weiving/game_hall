<template>
  <div id="gameActivity" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('hall')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">游戏活动</div>
    </div>
    <div class="page-content">
      <div class="box-item" v-for="(item,index) in activeList">
        <div class="active-pic">
          <img :src="'../../../static/img/activity'+item.activity_id+'.png'"/>
        </div>
        <div class="active-title">
          <p>{{item.activity_name}}</p>
          <div class="more-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "static/js/util";

  export default {
    name: "game-activity",
    data() {
      return {
        activeList: [],
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
      }
    },
    created() {
      this.getActiveList();
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getActiveList() {
        this.$http
          .post(`${this.$api}/v1/activity/r/get_activity_list/1/1`)
          .then(res => {
            var resData = res.data;
            console.log('活动列表', resData);
            if (resData.success == true) {
              this.activeList = resData.data;
            }

          })
      }
    }
  }
</script>

<style scoped lang="less">
  #gameActivity {
    .box-item {
      padding: unset;
      .active-pic {
        width: 100%;
        height: 125px;
        img {
          width: 100%;
          height: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          box-shadow: 0 0 20px 0 #ffffff;
        }
      }
      .active-title {
        padding: 20px 12px;
        position: relative;
        .more-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 7px;
          height: 12px;
          background: url("/static/img/wind01.png");
          background-size: cover;
        }
      }
    }
  }
</style>
