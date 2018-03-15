import Vue from "vue"
import {getLocalStorage} from "../static/js/util";

this.user_id = getLocalStorage('user_id');
const wsurl = "ws://192.168.50.124/v1/pubsub/ws?user_id=" + this.user_id;

const socket = new WebSocket(wsurl);

const emitter = new Vue({
  methods: {
    send(message) {
      if (1 === socket.readyState)
        socket.send(message)
    }
  }
});

socket.onmessage = function (msg) {
  var msgData = msg.data;
  console.log('socketjs的接受的数据', msgData);
  emitter.$emit("message", msgData);
}
socket.onerror = function (err) {
  emitter.$emit("error", err)
}


export default emitter
