import Vue from "vue"
import {getLocalStorage} from "./util";

// const user_id = getLocalStorage('user_id');
//
// const wsurl = "ws://192.168.50.154/v1/pubsub/ws?user_id=" + user_id;
//
// const socket = new WebSocket(wsurl);
//
// const emitter = new Vue({
//   methods: {
//     send(message) {
//       if (1 === socket.readyState)
//         socket.send(message)
//     }
//   }
// });
//
// socket.onmessage = function (msg) {
//   var msgData = msg.data;
//   console.log('socketjs数据', msgData);
//   emitter.$emit("message", msgData);
// }
// socket.onerror = function (err) {
//   emitter.$emit("error", err)
// }

const emitter = new Vue({
  data() {
    return {
      websock: null,
      originalUserId: getLocalStorage('user_id'),
    }
  },
  methods: {
    initSocket(user_id) {
      if (this.originalUserId == user_id && this.websock != null && this.websock.readyState == this.websock.OPEN) {
        // console.log('ws开启状态');
        this.send('msg');
      } else if (this.originalUserId == user_id && this.websock != null && this.websock.readyState == this.websock.CONNECTING) {
        // console.log('ws正在开启');
        let that = this;
        setTimeout(function () {
          that.send('msg')
        }, 300)
      } else {
        // console.log('ws重新建立');
        const wsurl = "ws://192.168.50.154/v1/pubsub/ws?user_id=" + user_id;
        this.websock = new WebSocket(wsurl);
      }
      this.websock.onmessage = function (msg) {
        var msgData = msg.data;
        // console.log('socket数据', msgData);
        emitter.$emit("message", msgData);
      };
      this.websock.onerror = function (err) {
        emitter.$emit("error", err)
      };
    },
    send(message) {
      if (emitter.websock != null && 1 === emitter.websock.readyState)
        emitter.websock.send(message)
    },

    close() {
      emitter.websock.close();
    }
  },
});


export default emitter
