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
  import Socket from "../../../static/js/socket";

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
          Socket.$on("message", this.getMessage)
        }
      },

      getMessage(res) {
        var resSerialize = JSON.parse(res);
        if (resSerialize.success == true) {
          this.isShow_msg = true;
          this.msg = resSerialize.msg;
          const that = this;
          setTimeout(function () {
            that.$root.Bus.$emit('toggleComponent', 'msgCenter')
          }, 1000)
        } else {
          this.isShow_msg = true;
          this.msg = resSerialize.msg;
        }

      }
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

<style scoped lang="less">
  #msgMySend {
    .box-item {
      vertical-align: middle;
      .select-title {
        height: 16px;
        line-height: 16px;
        width: 100px;
        color: #666666;
        //float: left;
        display: inline-block;
      }
      .select-value {
        //float: left;
        display: inline-block;
      }
      .select-btn {
        width: 60px;
        height: 56px;
        line-height: 56px;
        position: absolute;
        top: 0px;
        right: 0px;
        .select-icon {
          display: block;
          width: 12px;
          height: 6px;
          background: url("/static/img/do.png");
          background-size: cover;
          margin: 25px auto;
        }
      }
      .selectType {
        width: -webkit-calc(~"100vw - 180px");
        width: calc(~"100vw - 180px");
        position: absolute;
        top: 50px;
        right: 50px;
        background: #ffffff;
        padding: 15px 10px;
        -webkit-box-shadow: 0 0 2px 2px #e9f4ff;
        box-shadow: 0 0 2px 2px #e9f4ff;
        z-index: 100;
        .item {
          height: 30px;
          line-height: 30px;
          color: #666666;
        }
      }

      .account-number {
        width: -webkit-calc(~"100vw - 44px");
        width: calc(~"100vw - 44px");
        height: 30px;
        border-bottom: solid 1px #EBEBEB;
        margin-bottom: 15px;
        input {
          width: 100%;
        }
      }
      .msg-title {
        width: -webkit-calc(~"100vw - 44px");
        width: calc(~"100vw - 44px");
        height: 30px;
        border-bottom: solid 1px #EBEBEB;
        input {
          width: 100%;
        }
      }
      .msg-text {
        margin: 15px 0;
        color: #D1D1D1;
        textarea {
          width: -webkit-calc(~"100vw - 44px");
          width: calc(~"100vw - 44px");
          min-height: 230px;
          outline: none;
          border: none;
          font-size: 16px;
          resize: none;
        }
      }
    }
  }
</style>

