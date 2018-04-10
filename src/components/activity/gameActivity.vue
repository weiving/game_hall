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
  import {getLocalStorage} from "../../../static/js/util";

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

<style scoped>

</style>
