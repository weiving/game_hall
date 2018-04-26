<template>
  <div id="lowerDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('lowerManage')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">下级管理详细</div>
    </div>
    <div class="page-content">
      <div class="record-detail">
        <div class="record-head">
          <label>用户名</label>
          <span>jdshfajd1688</span>
        </div>
        <div class="record-item">
          <label class="text">余额</label>
          <div class="i-value">5659453</div>
        </div>
        <div class="record-item">
          <label class="text">该用户团队余额</label>
          <div class="i-value payment">11111.5</div>
        </div>
        <div class="record-item">
          <label class="text">返点</label>
          <div class="i-value">77777</div>
        </div>
        <div class="record-item">
          <label class="text">在线状态</label>
          <div class="i-value">452.1</div>
        </div>
        <div class="record-item">
          <label class="text">登陆时间</label>
          <div class="i-value">548255.2</div>
        </div>
        <div class="record-item">
          <label class="text">注册ip</label>
          <div class="i-value">+100.00</div>
        </div>
        <div class="record-item">
          <label class="text">备注</label>
          <div class="i-value">2018-02-21</div>
        </div>
      </div>
      <div class="record-title">对用户进行操作</div>
      <div class="record-opt">
        <div class="opt-item">调点</div>
        <div class="opt-item">分红设置</div>
        <div class="opt-item last">日工资设置</div>
      </div>
      <div class="record-opt">
        <div class="opt-item last">转账</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "lower-detail",
    created() {
      this.getLowerDetail();
    },
    data() {
      return {
        'lowerType': '',
        'lowerDetailId': '',
      }
    },
    methods: {
      getLowerDetail() {
        this.lowerType = getLocalStorage('lowerType');
        this.lowerDetailId = getLocalStorage('lowerDetailId');

        console.log('lowerType', this.lowerType)
        console.log('lowerDetailId', this.lowerDetailId);
        var params = new URLSearchParams();
        params.append('lowerDetailId', this.lowerDetailId)
        this.$http
          .post(`${this.$api}/aa/bb`, params)
          .then(res => {
            if (res.data.success == 1) {

            } else {

            }
          })
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">
  /*下级管理详情*/
  #lowerDetail {
    .record-title {
      height: 54px;
      color: #CCCFD2;
      font-size: 16px;
      text-align: center;
      padding-top: 30px;
    }
    .record-opt {
      background: #ffffff;
      margin-top: 15px;
      .opt-item {
        height: 50px;
        line-height: 50px;
        margin: 0 10px;
        border-bottom: solid 1px #E4E4E4;
        text-align: center;
        color: #5D97F9;
        &.last {
          border: none;
        }
      }
    }
  }
</style>
