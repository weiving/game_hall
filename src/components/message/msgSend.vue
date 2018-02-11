<template>
  <div id="msgSend" class="page-wrap">
    <div class="page-head">
      <!--<router-link to="/msgList" class="toReturn">-->
      <!--<img src="/static/img/left.png" alt="">-->
      <!--</router-link>-->
      <div class="toReturn" @click="toComponent('msgList')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">发送消息</div>
    </div>
    <div class="page-content">
      <div class="box-item">
        <div class="select-title">请选择类型:</div>
        <div class="select-value">{{defaultType}}</div>
        <div class="clearfix"></div>
        <div class="select-btn" @click="toggleShow">
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
          <textarea placeholder="请输入内容">{{content}}</textarea>
        </div>
      </div>
      <div class="default-btn">确定发送</div>
    </div>
    <div class="mask" v-show="isSelect" @click="toggleShow"></div>
  </div>
</template>

<script>
  export default {
    name: "msg-send",
    created() {
      this.getWebSocket();
      this.defaultTypeFn();
    },
    data() {
      return {
        isSelect: false,
        defaultType: '',
        typeList: ["直属上级", "直属下级", "所有直属下级"],
        typeIndex: 0,
        username: '',
        title: '',
        content: ''
      }
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getWebSocket() {
        console.log(this.websock)
      },
      defaultTypeFn() {
        this.defaultType = this.typeList[0]
      },
      toggleShow() {
        this.isSelect = !this.isSelect;
      },
      select_fn(index) {
        this.defaultType = this.typeList[index];
        this.typeIndex = index;
        this.isSelect = false;
      }
    }
  }
</script>

<style scoped>

</style>
