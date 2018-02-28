<template>
  <div id="msgTypeList" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgTypeList')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">详情页</div>
    </div>
    <div class="page-content">
      <div class="msgDetail-item">
        <div class="time">{{time}}</div>
        <div class="content">
          <div class="title">{{title}}</div>
          <div class="text">{{body}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-type-detail",
    created() {
      this.getDetailMsg();
    },
    data() {
      return {
        time: '',
        title: '',
        body: ''
      }
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getDetailMsg() {
        var user_id = getLocalStorage('user_id');
        var user_name = getLocalStorage('user_name');
        var notice_id = getLocalStorage('notice_id');

        var params = new URLSearchParams();
        params.append('notice_id', notice_id);

        this.$http
          .post(`${this.$api}/v1/notice/r/get_notice_info/${user_id}/${user_name}`, params)
          .then(res => {
            console.log('公告详情', res.data);
            if (res.data.success == true) {
              console.log('msgTypeDetail', res.data.data)
              this.time = res.data.data.effected_at;
              this.title = res.data.data.title;
              this.body = res.data.data.content;
            }
          })

      }
    },
  }
</script>

<style scoped>

</style>
