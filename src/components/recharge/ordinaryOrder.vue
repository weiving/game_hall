<template>
  <div id="ordinaryOrder" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('ordinaryPay')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">充值订单</div>
      <div class="page-head-btn" @click="toComponent('capitalRecord')">资金流水</div>
    </div>
    <div class="page-content">
      <div class="payee-item">
        <div class="bank-logo">
        </div>
        <div class="payee-info">
          <div class="row">
            <div class="bankName">招商银行</div>
          </div>
          <div class="row">
            <div class="label">银行卡号：</div>
            <div class="bankCard">4123515648216446822</div>
          </div>
          <div class="row">
            <div class="label">收款人：</div>
            <div class="payee">陈二狗</div>
          </div>
          <div class="row">
            <div class="label">开户网点：</div>
            <div class="openAddress">厦门软件园望海路21号之二</div>
          </div>
          <div class="row">
            <div class="label">充值码：</div>
            <div class="rechargeCode">4663</div>
          </div>
        </div>
      </div>

      <div class="other-item">
        <div class="qrCode">
          rewqr
        </div>
        <div class="payee-info">
          <div class="row">
            <div class="label">微信号：</div>
            <div class="number">adfddqq11</div>
          </div>
          <div class="row">
            <div class="label">微信昵称：</div>
            <div class="name">澈儿打分</div>
          </div>
          <div class="row">
            <div class="label">充值码：</div>
            <div class="rechargeCode">4663</div>
          </div>
        </div>
      </div>
      <div class="order-title">待充值订单</div>
      <div class="order-content">
        <div class="order-item">
          <div class="label-name">充值单号：</div>
          <div class="order-val">212345648945632</div>
        </div>
        <div class="order-item">
          <div class="label-name">充值金额：</div>
          <div class="order-val text-red">20.99元</div>
        </div>
        <div class="order-item">
          <div class="label-name">付款人：</div>
          <div class="order-val">陈二狗</div>
        </div>
        <div class="order-item">
          <div class="label-name">申请时间：</div>
          <div class="order-val">2018-03-16 18:10:22</div>
        </div>
      </div>
      <div class="default-btn active">完成</div>
      <div class="default-btn">撤销</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ordinary-order",
    data() {
      return {}
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      }
    }
  }
</script>

<style scoped>

</style>
