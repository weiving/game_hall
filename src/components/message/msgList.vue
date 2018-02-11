<template>
  <div id="msgList" class="page-wrap">
    <div class="page-head">
      <!--<router-link to="/msgCenter" class="toReturn">-->
      <!--<img src="/static/img/left.png" alt="">-->
      <!--</router-link>-->
      <div class="toReturn" @click="toComponent('msgCenter')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">{{msgType_title}}</div>
      <div class="page-head-btn" v-show="msgType=='myMsg'" @click="toComponent('msgSend')">发送</div>
    </div>
    <div class="page-content">
      <div class="message-item" v-for="(item,index) in message" v-bind:key="index">
        <div class="time">{{item.now}}</div>
        <div class="box-item">
          <div class="title">{{item.title}}</div>
          <div class="text">{{item.body}}</div>
          <div class="more" @click="lookDetail(item.id)">
            查看更多
            <div class="more-icon"></div>
          </div>
          <div class="news-tip" v-show="item.is_read===0">
            <i class="tip-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-List",
    created() {
      this.initWebSocket()
      // this.getMsg();
    },
    // props: ['wsArray', 'this_websock'],
    data() {
      return {
        user_id: "",
        msgType: '',
        msgType_title: '',
        message: '',
      }
    },
    methods: {
      threadPoxi() {  // 实际调用的方法
        //参数
        const agentData = "mymessage";
        //若是ws开启状态
        // this.user_id = 1;
        // const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
        // this.websock = new WebSocket(wsurl);
        // console.log('readyState',this.websock.readyState);
        // console.log('OPEN',this.websock.OPEN);
        // console.log('CONNECTING',this.websock.CONNECTING)
        if (this.websock.readyState === this.websock.OPEN) {
          console.log('11')
          this.websocketsend(agentData)
          console.log('22')
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
      },
      initWebSocket() { //初始化weosocket

        //ws地址
        // this.user_id = getLocalStorage("user_id");
        this.msgType = getLocalStorage("msgType");
        this.msgType_title = getLocalStorage("msgType_title");
        this.user_id = 1;
        const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
        this.websock = new WebSocket(wsurl);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        // this.$root.Bus.$emit("send","发送");
        // bus.emit("send","发送");
      },
      websocketonmessage(e) { //数据接收
        const redata = JSON.parse(e.data);
        console.log("redata", redata);
        if (redata.length > 1) {
          this.message = redata;
        } else {
          if (redata.is_read == 0) {
            this.message.unshift(redata);
          } else {
            setLocalStorage("detailMsg", JSON.stringify(redata));
          }
        }
      },
      websocketsend(agentData) {//数据发送
        this.websock.send(agentData);
      },
      websocketclose(e) {  //关闭
        console.log("connection closed (" + e.code + ")");
      },
      // getMsg() {
      //   this.msgType = getLocalStorage("msgType");
      //   this.msgType_title = getLocalStorage("msgType_title");
      //   console.log('wsArray', this.wsArray);
      //   if (this.wsArray == "" || this.wsArray == undefined) {
      //     this.wsArray = JSON.parse(getLocalStorage('message'));
      //   } else {
      //     var val = JSON.stringify(this.wsArray);
      //     this.message=val;
      //     setLocalStorage('message', val);
      //   }
      // },
      lookDetail(id) {
        console.log(id)
        // this.websock.send('{"cmd":"read","args":["' + id + '"]}');
        // var _this = this;
        // setTimeout(function () {
        //   _this.$router.push({path: '/msgDetail'})
        // }, 50)
        this.websock.send('{"cmd":"read","msg_id":"' + id + '"}');
        var _this = this;

        setTimeout(function () {
          // _this.$router.push({path: '/msgDetail'})
          _this.$root.Bus.$emit('toggleComponent', 'msgDetail')
        }, 50)
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      }
    },
    // watch: {
    //   wsArray: function (wsArray) {
    //     // this.message = wsArray;
    //     console.log(wsArray)
    //     if (wsArray.length > 1) {
    //       this.message = wsArray;
    //     } else {
    //       if (wsArray.is_read == 0) {
    //         this.message.unshift(wsArray);
    //       } else {
    //         setLocalStorage("detailMsg", JSON.stringify(wsArray));
    //       }
    //     }
    //   }
    // }
  }
</script>

<style scoped>

</style>
