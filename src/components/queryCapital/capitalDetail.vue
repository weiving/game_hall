<template>
  <div id="capitalRecord" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('capitalRecord')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">充提转详情</div>
    </div>
    <div class="page-content">
      <div class="record-detail" v-if="capitalType=='recharge'">
        <div class="record-head">
          <label>充值单号</label>
          <span>{{detailData.order_no}}</span>
        </div>
        <div class="record-item">
          <label class="text">预支付金额</label>
          <div class="i-value">{{detailData.money}}</div>
        </div>
        <div class="record-item">
          <label class="text">实际支付金额</label>
          <div class="i-value payment">{{detailData.pay_money}}</div>
        </div>
        <div class="record-item">
          <label class="text-4">手续费</label>
          <div class="i-value">{{detailData.fee}}</div>
        </div>
        <div class="record-item">
          <label class="text">实际到账金额</label>
          <div class="i-value">{{detailData.arrival_money}}</div>
        </div>
        <div class="record-item">
          <label class="text">支付到账后余额</label>
          <div class="i-value">{{detailData.balance}}</div>
        </div>
        <div class="record-item">
          <label class="text">付款银行</label>
          <div class="i-value">{{detailData.deposit_bank}}</div>
        </div>
        <div class="record-item">
          <label class="text">付款人姓名</label>
          <div class="i-value">{{detailData.deposit_user}}</div>
        </div>
        <div class="record-item">
          <label class="text">订单状态</label>
          <div class="i-value">{{orderStatus[detailData.status-1]}}</div>
        </div>
        <div class="record-item">
          <label class="text">创建时间</label>
          <div class="i-value">{{detailData.created_at}}</div>
        </div>
        <div class="record-item">
          <label class="text">到账时间</label>
          <div class="i-value">{{detailData.updated_at}}</div>
        </div>
        <div class="record-item">
          <label class="text">结束时间</label>
          <div class="i-value">{{detailData.finished_at}}</div>
        </div>
      </div>
      <div class="record-detail" v-if="capitalType=='withdrawal'">
        <div class="record-head">
          <label>提现单号</label>
          <span>{{detailData.order_no}}</span>
        </div>
        <div class="record-item">
          <label class="text">提现金额</label>
          <div class="i-value">{{detailData.money}}</div>
        </div>
        <div class="record-item">
          <label class="text">手续费</label>
          <div class="i-value">{{detailData.fee}}</div>
        </div>
        <div class="record-item">
          <label class="text">提现银行</label>
          <div class="i-value">{{detailData.bank_name}}</div>
        </div>
        <div class="record-item">
          <label class="text">提现银行卡号</label>
          <div class="i-value">{{detailData.card_no}}</div>
        </div>
        <div class="record-item">
          <label class="text">提现银行卡开户名</label>
          <div class="i-value">{{detailData.card_user}}</div>
        </div>
        <div class="record-item">
          <label class="text">提现银行卡开户行</label>
          <div class="i-value">{{detailData.card_addr}}</div>
        </div>
        <div class="record-item">
          <label class="text">提现订单状态</label>
          <div class="i-value">{{drawOrderStatus[detailData.status-1]}}</div>
        </div>
        <div class="record-item">
          <label class="text">审核状态</label>
          <div class="i-value">{{drawOrderStatus1[detailData.audit_status-1]}}</div>
        </div>
        <div class="record-item">
          <label class="text">提款人</label>
          <div class="i-value">{{detailData.username}}</div>
        </div>
      </div>
      <div class="record-detail" v-if="capitalType=='transfer'">
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
      <div class="record-detail" v-if="capitalType=='inOrOut'">
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
  import {getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "capital-detail",
    created() {
      this.getCapitalDetail();
    },
    data() {
      return {
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        // capitalType: ['recharge', 'withdrawal', 'transfer', 'inOrOut'],
        capitalType: '',
        capitalDetailId: '',
        detailData: {},
        orderStatus: ['待充值', '到账', '退回', '撤销', '过期未到账', '完成'],
        drawOrderStatus: ['创建订单', '待审核', '审核中', '审核完成'],
        drawOrderStatus1: ['未审核', '通过', '退回', '通过并打款'],
      }
    },
    methods: {
      getCapitalDetail() {
        this.capitalType = getLocalStorage('capitalType');
        this.capitalDetailId = getLocalStorage('capitalDetailId');
        var params = new URLSearchParams();
        if (this.capitalType == 'recharge') {
          params.append('order_no', this.capitalDetailId)
          this.$http
            .post(`${this.$api}/v1/pay/r/get_pay_order/${this.user_id}/${this.username}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              // console.log('11',resData)
              if (resData.success == true) {
                this.detailData = resData.data;
              } else {

              }
            })
        } else if (this.capitalType == 'withdrawal') {
          params.append('order_no', this.capitalDetailId)
          this.$http
            .post(`${this.$api}/v1/draw/r/get_draw_order/${this.user_id}/${this.username}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                this.detailData = resData.data;
              } else {

              }
            })
        }

      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    destroyed() {
      removeLocalStorage('capitalDetailId');
      removeLocalStorage('capitalType');
    }
  }
</script>

<style scoped>

</style>
