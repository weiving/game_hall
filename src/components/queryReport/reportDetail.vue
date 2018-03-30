<template>
  <div id="reportDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('reportRecord')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">游戏报表详情</div>
    </div>
    <div class="page-content">
      <div class="record-detail" v-if="reportType=='gameReport'">
        <div class="record-head">
          <label>总游戏量1</label>
          <span>局数7</span>
        </div>
        <div class="record-item">
          <label class="text-4">流 水</label>
          <div class="i-value">5659453</div>
        </div>
        <div class="record-item">
          <label class="text-4">返点</label>
          <div class="i-value payment">1.5</div>
        </div>
        <div class="record-item">
          <label class="text-4">团队赚水</label>
          <div class="i-value">77777</div>
        </div>
        <div class="record-item">
          <label class="text-4">派奖</label>
          <div class="i-value">452.1</div>
        </div>
        <div class="record-item">
          <label class="text-4">活动金额</label>
          <div class="i-value">548255.2</div>
        </div>
        <div class="record-item">
          <label class="text-4">实际盈亏</label>
          <div class="i-value">+100.00</div>
        </div>
        <div class="record-item">
          <label class="text-4">时间</label>
          <div class="i-value">2018-02-21</div>
        </div>
      </div>
      <div class="record-detail" v-if="reportType=='personalReport'">
        <div class="record-head">
          <label>总游戏金额50000</label>
          <span>笔数9</span>
        </div>
        <div class="record-item">
          <label class="text-4">充值金额</label>
          <div class="i-value">5659453</div>
        </div>
        <div class="record-item">
          <label class="text-4">出款金额</label>
          <div class="i-value payment">1.5</div>
        </div>
        <div class="record-item">
          <label class="text-4">转入游戏</label>
          <div class="i-value">77777</div>
        </div>
        <div class="record-item">
          <label class="text-4">转出游戏</label>
          <div class="i-value">452.1</div>
        </div>
        <div class="record-item">
          <label class="text-4">返水</label>
          <div class="i-value">548255.2</div>
        </div>
        <div class="record-item">
          <label class="text-4">团队赚水</label>
          <div class="i-value">+100.00</div>
        </div>
        <div class="record-item">
          <label class="text-4">派奖</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">活动</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">实际</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">盈亏</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">时间</label>
          <div class="i-value">2018-02-21</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage,removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "report-detail",
    created() {
      this.getReportDetail();
    },
    data() {
      return {
        'reportType': '',
        'reportDetailId': '',
      }
    },
    methods: {
      getReportDetail() {
        // this.reportType = this.$route.query.reportType;
        // this.reportDetailId = this.$route.query.reportDetailId;
        this.reportType = getLocalStorage('reportType');
        this.reportDetailId = getLocalStorage('reportDetailId');

        console.log('reportType', this.reportType)
        console.log('reportDetailId', this.reportDetailId);
        var params = new URLSearchParams();
        params.append('reportDetailId', this.reportDetailId)
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
    },
    destroyed(){
      removeLocalStorage('reportDetailId')
      removeLocalStorage('reportType')
    }
  }
</script>

<style scoped>

</style>
