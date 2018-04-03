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
      <div class="record-detail" v-if="reportType=='platformReport'">
        <div class="record-head">
          <label>用户账号</label>
          <span>{{dataVal.user_name}}</span>
        </div>
        <div class="record-item">
          <label class="text-4">总入款</label>
          <div class="i-value">{{parseFloat(dataVal.recharge).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">入款次数</label>
          <div class="i-value payment">{{dataVal.recharge_times}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">平均入款</label>
          <div class="i-value">{{parseFloat(dataVal.recharge_aver).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">总出款</label>
          <div class="i-value">{{parseFloat(dataVal.withdraw).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">出款次数</label>
          <div class="i-value">{{dataVal.withdraw_times}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">平均出款</label>
          <div class="i-value">{{parseFloat(dataVal.withdraw_aver).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">活动总额</label>
          <div class="i-value">{{parseFloat(dataVal.award).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">活动次数</label>
          <div class="i-value">{{dataVal.award_times}}</div>
        </div>
        <div class="record-item">
          <label class="text">平均活动金额</label>
          <div class="i-value">{{parseFloat(dataVal.award_aver).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">退佣总额</label>
          <div class="i-value">{{parseFloat(dataVal.rebate).toFixed(2)}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">退佣笔数</label>
          <div class="i-value">{{dataVal.rebatetimes}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">平均退佣</label>
          <div class="i-value">{{parseFloat(dataVal.rebate_aver).toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage, removeLocalStorage, formatDate} from "../../../static/js/util";

  export default {
    name: "report-detail",
    created() {
      this.getReportDetail();
    },
    data() {
      return {
        reportType: getLocalStorage('reportType'),
        reportDetailId: getLocalStorage('reportDetailId'),
        start_date: '2018-01-01 00:00:00',
        end_date: '2018-01-01 23:59:59',

        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),

        dataVal: {},
        currentPage: 1,
        pages: 0,
        pageSize: 5,
        total: 0,
      }
    },
    methods: {
      getReportDetail() {
        console.log('reportType', this.reportType)
        console.log('reportDetailId', this.reportDetailId);
        var minDay = this.start_date;
        var maxDay = this.end_date;

        var params = new URLSearchParams();
        if (this.reportType == 'personalReport') {

        } else if (this.reportType == 'platformReport') {
          var obj = {
            user_id: parseInt(this.reportDetailId),
            start_time: minDay,
            end_time: maxDay,
            page_index: this.currentPage,
            page_size: this.pageSize,
            operator_id: this.user_id
          };
          params.append('args', JSON.stringify(obj));

          this.$http
            .post(`${this.$api}/v1/report/r/platform/${this.user_id}/${this.username}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              console.log('detail', resData);
              if (resData.success == true) {
                this.dataVal = resData.data.list[0];
                this.currentPage = parseInt(resData.data.page_index);
                this.pages = parseInt(resData.data.pages);
                this.pageSize = parseInt(resData.data.page_size);
                this.total = parseInt(resData.data.total);
              } else {

              }
            })
        } else {

        }

      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    destroyed() {
      removeLocalStorage('reportDetailId')
      removeLocalStorage('reportType')
    }
  }
</script>

<style scoped>

</style>
