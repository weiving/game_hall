<template>
  <div id="manageCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">银行卡管理</div>
    </div>
    <div class="page-content">
      <div class="card-list">
        <div class="card-item">
          <div class="card-logo">招商</div>
          <div class="card-name">招商银行</div>
          <div class="cardID">6236 **** **** 8889</div>
          <div class="card-owner">
            <span>持卡人:</span>
            <div class="owner">罗**</div>
          </div>
        </div>
      </div>
      <div class="bind-card" @click="toComponent('bindCard')">
        <div class="add-btn">
          <div class="add-icon">＋</div>
          <div class="text">添加银行卡</div>
        </div>
      </div>
      <div class="opt-box" v-show="isShow">
        <div class="box-item">
          <div class="opt-btn card-line">更换银行卡</div>
          <div class="opt-btn">修改预留手机号</div>
        </div>
        <div class="box-item">
          <div class="opt-btn">删除</div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isShow"></div>
  </div>
</template>

<script>
  export default {
    name: "manage-card",
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },

    }
  }
</script>

<style scoped>

</style>
