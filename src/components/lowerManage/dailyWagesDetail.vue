<template>
  <div id="dailyWagesDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('dailyWages')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">工资期数详细</div>
    </div>
    <div class="page-content">
      <div class="record-detail">
        <div class="record-head">
          <label>工资期数</label>
          <span>5/62</span>
        </div>
        <div class="record-item">
          <label class="text-4">游戏名称</label>
          <div class="i-value">5659453</div>
        </div>
        <div class="record-item">
          <label class="text-4">用户名</label>
          <div class="i-value payment">1.5</div>
        </div>
        <div class="record-item">
          <label class="text-4">总游戏额</label>
          <div class="i-value">77777</div>
        </div>
        <div class="record-item">
          <label class="text-4">派奖金额</label>
          <div class="i-value">452.1</div>
        </div>
        <div class="record-item">
          <label class="text-4">游戏返点</label>
          <div class="i-value">548255.2</div>
        </div>
        <div class="record-item">
          <label class="text-4">团队赚水</label>
          <div class="i-value">+100.00</div>
        </div>
        <div class="record-item">
          <label class="text-4">实际盈亏</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">状态</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text">日工资金额</label>
          <div class="i-value">2018-02-21</div>
        </div>
      </div>
      <div class="record-title">对用户进行操作</div>
      <div class="record-opt">
        <div class="opt-item last">转账</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "daily-wages-detail",
    created() {
      this.getDailyWagesDetail();
    },
    data() {
      return {
        'shareBonusDetailId': '',
      }
    },
    methods: {
      getDailyWagesDetail() {
        this.dailyWagesDetailId = getLocalStorage('dailyWagesDetailId');
        console.log('dailyWagesDetailId', this.dailyWagesDetailId);
        var params = new URLSearchParams();
        params.append('dailyWagesDetailId', this.dailyWagesDetailId)
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
  #dailyWagesDetail {
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
