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
  import {getLocalStorage} from "../../../static/js/util";

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
        this.time = info.now;
        this.title = info.title;
        this.body = info.body;
      }
    },

  }
</script>

<style scoped>

</style>
