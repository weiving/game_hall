<template>
  <div id="recordDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('record')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">游戏记录详情</div>
    </div>
    <div class="page-content">
      <div class="record-detail" v-if="recordType=='gameRecord'">
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
      <div class="record-detail" v-if="recordType=='accountRecord'">
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
      <div class="record-detail" v-if="recordType=='agentRecord'">
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
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "record-detail",
    created() {
      this.getRecordDetail();
    },
    data() {
      return {
        'recordType': '',
        'recordDetailId': '',
      }
    },
    methods: {
      getRecordDetail() {
        // this.recordType = this.$route.query.recordType;
        // this.recordDetailId = this.$route.query.recordDetailId;
        this.recordType=getLocalStorage('recordType');
        this.recordDetailId=getLocalStorage('recordDetailId');
        console.log('reportType', this.reportType)
        console.log('reportDetailId', this.reportDetailId);
        var params = new URLSearchParams();
        params.append('recordDetailId', this.recordDetailId)
        this.$http
          .post(`/api/aa/bb`, params)
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

<style scoped>

</style>
