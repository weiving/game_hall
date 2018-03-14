<template>
  <div id="msgMy" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgCenter')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">我的消息</div>
      <div class="page-head-btn" @click="toComponent('msgMySend')">发送</div>
    </div>
    <div class="page-content">
      <div class="message-item" v-for="(item,index) in message" v-bind:key="index">
        <div class="time">{{item.created_at}}</div>
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
  // import {setLocalStorage, getLocalStorage, abc_WebSocket} from "../../../static/js/util";
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-My",
    data() {
      return {
        user_id: "",
        // msgType: '',
        // msgType_title: '',
        message: [],
        ws: '',
        res: '',
      }
    },
    created() {
      this.initws()
    },
    mounted() {
      this.runws()
    },
    methods: {
      runws() {
        let content = '我的消息'
        if (this.ws.readyState === this.ws.OPEN) {
          // console.log('msgMy', "OPEN")
          this.sendMessage(content)
        } else if (this.ws.readyState === this.ws.CONNECTING) {
          // console.log('msgMy', "CONNECTING");
          let that = this
          setTimeout(function () {
            that.sendMessage(content)
          }, 300)
        } else {
          // console.log("msgMy", 'initws');
          this.initws()
          let that = this
          setTimeout(function () {
            that.sendMessage(content)
          }, 500)
        }
      },
      initws() {
        // this.msgType = getLocalStorage("msgType");
        // this.msgType_title = getLocalStorage("msgType_title");
        this.user_id = getLocalStorage('user_id');
        const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
        this.ws = new WebSocket(wsurl);
        this.ws.onmessage = this.getMessage;
        this.over = () => {
          this.ws.close()
        }
      },
      getMessage(e) {
        const res = JSON.parse(e.data);
        if (res.length > 1) {
          this.message = res;
        } else {
          if (res instanceof Array) {
            var resData = res[0];
            if (resData != undefined && resData != '') {
              this.message.unshift(resData);
            }
          } else if (res instanceof Object) {
            if (res.cmd === 'read') {
              setLocalStorage("myMsgDetail", JSON.stringify(res));
            } else {
              this.message.unshift(res);
            }
          } else {
            console.log('空的')
          }
          // if (resData.is_read == 0) {
          //   this.message.unshift(resData);
          // } else {
          //   setLocalStorage("myMsgDetail", JSON.stringify(resData));
          // }
        }
      },
      sendMessage(content) {
        this.ws.send(content)
      },
      lookDetail(id) {
        this.sendMessage('{"cmd":"read","msg_id":"' + id + '"}');
        var _this = this;
        setTimeout(function () {
          _this.$root.Bus.$emit('toggleComponent', 'msgMyDetail')
        }, 50)
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    beforeDestroy() {
      this.over();
    }
  }
</script>

<style scoped>

</style>
