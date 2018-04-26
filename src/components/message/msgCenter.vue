<template>
  <div id="msgCenter" class="page-wrap">
    <div class="page-head">
      <div class="title">消息中心</div>
    </div>
    <div class="page-content">
      <div class="box-item" @click="toComponent('msgMy')">
        <div class="bell-icon"></div>
        <div class="item-content">
          <div class="title">我的消息</div>
          <div class="text">大家好！充值平台已于12月18日...</div>
          <div class="time">2017年12月27日</div>
        </div>
      </div>
      <div class="box-item" v-for="(item,index) in noticeTypeList" @click="toTypeList(item.notice_type)">
        <div class="flag-icon"></div>
        <div class="item-content">
          <div class="title">{{item.type_name}}</div>
          <div class="text">亲爱的玩家您可以点击选择官网充值...</div>
          <div class="time">2017年12月27日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";
  import Socket from '../../../static/js/socket'

  export default {
    name: "msg-center",
    data() {
      return {
        user_id: getLocalStorage('user_id'),
        user_name: getLocalStorage('user_name'),
        session: getLocalStorage('session'),
        noticeTypeList: ''
      }
    },
    created() {
      this.getNoticeType();
    },
    methods: {
      getNoticeType() {
        this.$http
          .post(`${this.$api}/v1/notice/r/find_notice_type_list/${this.user_id}/${this.user_name}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
            // console.log(resData)
            this.noticeTypeList = resData.data;
          })
      },
      toComponent(component) {
        if (component == 'msgMy') {
          if (Socket.websock == null || Socket.websock.readyState != 1) {
            this.$router.push({path: '/login'})
          } else {
            this.$root.Bus.$emit('toggleComponent', component)
          }
        } else {
          this.$root.Bus.$emit('toggleComponent', component)
        }


      },
      toTypeList(notice_type) {
        var noticeTitle = '';
        if (notice_type == 1) {
          noticeTitle = '滚动公告';
        } else if (notice_type == 2) {
          noticeTitle = '首页公告';
        } else if (notice_type == 3) {
          noticeTitle = '立即弹窗公告';
        } else if (notice_type == 4) {
          noticeTitle = '系统公告';
        } else if (notice_type == 5) {
          noticeTitle = '游戏公告';
        }
        setLocalStorage('noticeTitle', noticeTitle);
        setLocalStorage('noticeType', notice_type);
        this.$root.Bus.$emit('toggleComponent', 'msgTypeList')
      }
    }
  }
</script>

<style scoped>


</style>
