<template>
  <div id="app">
    <router-view/>
    <iFooter></iFooter>
  </div>
</template>

<script>
  // import {getLocalStorage} from "../static/js/util";
  import iFooter from '@/components/footer/iFooter'

  export default {
    // created() {
    //   this.initWebSocket();
    // },
    name: 'app',
    components: {
      iFooter: iFooter
    }
    // data() {
    //   return {
    //     wsArray: []
    //   }
    // },
    // methods: {
    //   threadPoxi() {  // 实际调用的方法
    //     //参数
    //     const agentData = "mymessage";
    //     //若是ws开启状态
    //     // this.user_id = 1;
    //     // const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
    //     // this.websock = new WebSocket(wsurl);
    //     // console.log('readyState',this.websock.readyState);
    //     // console.log('OPEN',this.websock.OPEN);
    //     // console.log('CONNECTING',this.websock.CONNECTING)
    //     if (this.websock.readyState === this.websock.OPEN) {
    //       console.log('11')
    //       this.websocketsend(agentData)
    //       console.log('22')
    //     }
    //     // 若是 正在开启状态，则等待300毫秒
    //     else if (this.websock.readyState === this.websock.CONNECTING) {
    //       let that = this;//保存当前对象this
    //       setTimeout(function () {
    //         that.websocketsend(agentData)
    //       }, 300);
    //     }
    //     // 若未开启 ，则等待500毫秒
    //     else {
    //       this.initWebSocket();
    //       let that = this;//保存当前对象this
    //       setTimeout(function () {
    //         that.websocketsend(agentData)
    //       }, 500);
    //     }
    //   },
    //   initWebSocket() { //初始化weosocket
    //     //ws地址
    //     // this.user_id = getLocalStorage("user_id");
    //     this.user_id = 39429;
    //     const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
    //     this.websock = new WebSocket(wsurl);
    //     this.websock.onmessage = this.websocketonmessage;
    //     this.websock.onclose = this.websocketclose;
    //   },
    //   websocketonmessage(e) { //数据接收
    //     const redata = JSON.parse(e.data);
    //     // console.log("redata", redata);
    //     this.wsArray = redata;
    //     console.log('wsarray', this.wsArray)
    //     if (redata.length > 1) {
    //       this.message = redata;
    //     } else {
    //       if (redata.is_read == 0) {
    //         this.message.unshift(redata);
    //       } else {
    //         setLocalStorage("detailMsg", JSON.stringify(redata));
    //       }
    //     }
    //   },
    //   websocketsend(agentData) {//数据发送
    //     this.websock.send(agentData);
    //   },
    //   websocketclose(e) {  //关闭
    //     console.log("connection closed (" + e.code + ")");
    //   },
    // }
  }
</script>

<style>

</style>
