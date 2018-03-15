<template>
  <div id="msgMySend" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgMy')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">发送消息</div>
    </div>
    <div class="page-content">
      <div class="box-item" @click="toggleShow">
        <div class="select-title">请选择类型:</div>
        <div class="select-value">{{defaultType}}</div>
        <div class="clearfix"></div>
        <div class="select-btn">
          <i class="select-icon"></i>
        </div>
        <div class="selectType" v-show="isSelect">
          <div v-for="(item,index) in typeList" class="item" @click="select_fn(index)">
            {{item}}
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="account-number" v-show="typeIndex==1">
          <input type="text" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="msg-title">
          <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <div class="msg-text">
          <textarea placeholder="请输入内容" v-model="content">{{content}}</textarea>
        </div>
      </div>
      <div class="default-btn" :class="{active:disableSend}" @click="sureSend">确定发送</div>
    </div>
    <div class="mask" v-show="isSelect" @click="toggleShow"></div>
    <div class="mask" v-if="isShow_msg" @click="toggleMsg"></div>
    <div class="mask-text" v-if="isShow_msg" @click="toggleMsg"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";
  import Socket from "../../socket";

  export default {
    name: "msg-send",
    data() {
      return {
        isSelect: false,
        defaultType: '',
        typeList: ["直属上级", "直属下级", "所有直属下级"],
        typeIndex: 0,
        username: '',
        title: '',
        content: '',
        msg: '',
        isShow_msg: false,
      }
    },
    created() {
      this.defaultTypeFn();
      // this.initws();
      Socket.$on("message", this.getMessage)
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      defaultTypeFn() {
        this.defaultType = this.typeList[0]
      },
      toggleShow() {
        this.isSelect = !this.isSelect;
      },
      toggleMsg() {
        this.isShow_msg = !this.isShow_msg;
      },
      select_fn(index) {
        this.defaultType = this.typeList[index];
        this.typeIndex = index;
        this.isSelect == false;
      },
      sureSend() {
        if (this.disableSend) {
          let sendMsg = '';
          if (this.typeIndex == 0) {
            sendMsg = '{"cmd":"send","channels":["parent"],"title":"' + this.title + '","body":"' + this.content + '"}';
          } else if (this.typeIndex == 1) {
            sendMsg = '{"cmd":"send","child_name":"' + this.username + '","title":"' + this.title + '","body":"' + this.content + '"}';
          } else {
            sendMsg = '{"cmd":"send","channels":["children"],"title":"' + this.title + '","body":"' + this.content + '"}';
          }
          Socket.send(sendMsg);
        }
      },


      // initws() {
      //   this.user_id = getLocalStorage('user_id');
      //   const wsurl = `${this.$wsurl}` + "/ws?user_id=" + this.user_id;
      //   this.ws = new WebSocket(wsurl);
      //   this.ws.onmessage = this.getMessage;
      //   this.ws.onclose = '';
      //   this.over = () => {
      //     this.ws.close()
      //   }
      // },
      // getMessage(res) {
      //   var resSerialize = JSON.parse(res);
      //   if (resSerialize.success == true) {
      //     this.isShow_msg = true;
      //     this.msg = resSerialize.msg;
      //     const that = this;
      //     setTimeout(function () {
      //       that.$root.Bus.$emit('toggleComponent', 'msgCenter')
      //     }, 1000)
      //   } else {
      //     this.isShow_msg = true;
      //     this.msg = resSerialize.msg;
      //   }
      //
      // }
    },
    computed: {
      disableSend: function () {
        if (this.typeIndex == 1) {
          if (this.username.trim().length > 0 && this.title.trim().length > 0 && this.content.trim().length > 0) {
            return true
          } else {
            return false
          }
        } else {
          if (this.title.trim().length > 0 && this.content.trim().length > 0) {
            return true
          } else {
            return false
          }
        }
      }
    },
    beforeDestroy() {
      Socket.$off("message", this.getMessage)
    }
  }
</script>

<style scoped>

</style>
