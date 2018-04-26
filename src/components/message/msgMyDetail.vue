<template>
  <div id="msgMyDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgMy')">
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
  import {getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-My-Detail",
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
        var info = JSON.parse(getLocalStorage("myMsgDetail"));
        this.time = info.created_at;
        this.title = info.title;
        this.body = info.body;
      }
    },
    destroyed() {
      removeLocalStorage('myMsgDetail')
    }
  }
</script>

<style scoped lang="less">
  #msgMyDetail {
    .msgDetail-item {
      .time {
        margin-top: 20px;
        margin-bottom: 18px;
        text-align: center;
        color: #CDD0D4;
      }
      .content {
        margin-left: 10px;
        margin-right: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        font-size: 14px;
        padding: 12px 14px;
        box-shadow: 0 0 5px 2px #e9f4ff;
        position: relative;

        .title {

        }

        .text {
          margin-top: 10px;
          margin-bottom: 10px;
          color: #666666;
          line-height: 20px;
        }
      }
    }
  }
</style>
