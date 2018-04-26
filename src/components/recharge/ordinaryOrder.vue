<template>
  <div id="ordinaryOrder" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('recharge')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">充值订单</div>
      <div class="page-head-btn" @click="toComponent('capitalRecord')">资金流水</div>
    </div>
    <div class="page-content">
      <div class="payee-item">
        <div class="bank-logo">
          <img :src="'/static/img/bank/bank-'+pay_id+'.png'" alt="logo">
        </div>
        <div class="payee-info">
          <div class="row">
            <div class="bankName">{{pay_alias}}</div>
          </div>
          <div class="row">
            <div class="label">银行卡号：</div>
            <div class="bankCard">{{pay_account}}</div>
          </div>
          <div class="row">
            <div class="label">收款人：</div>
            <div class="payee">{{pay_account_user}}</div>
          </div>
          <div class="row">
            <div class="label">开户网点：</div>
            <div class="openAddress">{{pay_account_addr}}</div>
          </div>
          <div class="row">
            <div class="label">充值码：</div>
            <div class="rechargeCode">4663</div>
          </div>
        </div>
      </div>

      <!--<div class="other-item">-->
      <!--<div class="qrCode">-->
      <!--rewqr-->
      <!--</div>-->
      <!--<div class="payee-info">-->
      <!--<div class="row">-->
      <!--<div class="label">微信号：</div>-->
      <!--<div class="number">adfddqq11</div>-->
      <!--</div>-->
      <!--<div class="row">-->
      <!--<div class="label">微信昵称：</div>-->
      <!--<div class="name">澈儿打分</div>-->
      <!--</div>-->
      <!--<div class="row">-->
      <!--<div class="label">充值码：</div>-->
      <!--<div class="rechargeCode">4663</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="order-title">待充值订单</div>
      <div class="order-content">
        <div class="order-item">
          <div class="label-name">充值单号：</div>
          <div class="order-val">{{order_no}}</div>
        </div>
        <div class="order-item">
          <div class="label-name">充值金额：</div>
          <div class="order-val text-red">{{money}}元</div>
        </div>
        <div class="order-item">
          <div class="label-name">付款人：</div>
          <div class="order-val">{{deposit_user}}</div>
        </div>
        <div class="order-item">
          <div class="label-name">申请时间：</div>
          <div class="order-val">{{created_at}}</div>
        </div>
      </div>
      <div class="default-btn active" @click="finishedOrder">完成</div>
      <div class="default-btn" @click="cancelOrder">撤销</div>
    </div>
    <div class="mask" v-show="isShowMask" @click="hideMask"></div>
    <div class="mask-text" v-show="isShowMask" @click="hideMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "ordinary-order",
    data() {
      return {
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        pay_id: '',
        pay_alias: '',
        pay_account: '',
        pay_account_user: '',
        pay_account_addr: '',
        order_no: '',
        money: '',
        deposit_user: '',
        created_at: '',
        isShowMask: false,
        msg: '',
      }
    },
    created() {
      this.getPayInfo();
    },
    methods: {
      getPayInfo() {
        var unPayOrder = JSON.parse(getLocalStorage('orderInfo'));
        this.pay_id = unPayOrder.pay_id;
        this.pay_alias = unPayOrder.pay_alias;
        this.pay_account = unPayOrder.pay_account;
        this.pay_account_user = unPayOrder.pay_account_user;
        this.pay_account_addr = unPayOrder.pay_account_addr;
        this.order_no = unPayOrder.order_no;
        this.money = unPayOrder.money;
        this.deposit_user = unPayOrder.deposit_user;
        this.created_at = unPayOrder.created_at;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      cancelOrder() {
        var params = new URLSearchParams();
        params.append('order_no', this.order_no);
        var that = this;
        this.$http
          .post(`${this.$api}/v1/pay/w/revoke_pay_order/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            console.log('撤销', resData);
            if (resData.success == true) {
              this.isShowMask = true;
              this.msg = '您成功撤销一笔支付订单';
              setTimeout(function () {
                that.$root.Bus.$emit('toggleComponent', 'recharge');
                that.isShowMask = false;
                that.msg = '';
              }, 1000);
            } else {
              this.isShowMask = true;
              this.msg = resData.msg;
            }
          })
      },
      finishedOrder() {

      },
      hideMask() {
        this.isShowMask = false;
        this.msg = '';
      }
    },
    destroyed() {
      removeLocalStorage('orderInfo');
    }
  }
</script>

<style scoped lang="less">
  #ordinaryOrder {

    .payee-item {
      margin: 18px auto;
      border-radius: 10px;
      font-size: 14px;
      //width: -webkit-calc(~"100vw - 20px");
      //width: calc(~"100vw - 20px");
      width: 353px;
      height: 176px;
      background: url("/static/img/bankbg.png");
      background-size: cover;
      position: relative;
      color: #ffffff;
      .bank-logo {
        position: absolute;
        top: 20px;
        left: 10px;
        width: 50px;
        height: 50px;
        background: #ffffff;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .payee-info {
        padding: 25px 0 0 70px;
        .row {
          height: 18px;
          line-height: 18px;
          width: 270px;
          margin-bottom: 7px;
          overflow: hidden;
          clear: both;
          .label {
            float: left;
          }
          .bankCard {
            float: left;
          }
        }
      }
    }

    .other-item {
      margin: 18px auto;
      border-radius: 10px;
      font-size: 14px;
      //width: -webkit-calc(~"100vw - 20px");
      //width: calc(~"100vw - 20px");
      width: 353px;
      height: 176px;
      background: url("/static/img/bankbg.png");
      background-size: cover;
      position: relative;
      color: #ffffff;

      .qrCode {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 20px;
        left: 20px;
      }
      .payee-info {
        padding: 50px 0 0 100px;
        .row {
          height: 18px;
          line-height: 18px;
          width: 270px;
          margin-bottom: 7px;
          overflow: hidden;
          clear: both;
          .label {
            float: left;
          }
          .bankCard {
            float: left;
          }
        }
      }
    }
    .order-title {
      width: 100%;
      margin-top: 10px;
      padding: 15px 12px;
      color: #C3C5C8;
      box-shadow: 0px -3px 5px #EFF7FE inset;
    }
    .order-content {
      width: 100%;
      background: #ffffff;
      padding: 0 20px;
      .order-item {
        height: 50px;
        line-height: 50px;
        clear: both;
        border-bottom: 1px solid #EBEBEB;
        .label-name {
          float: left;
        }
        .order-val {
          color: #C3C5C8;
          float: left;
        }
        .text-red {
          color: red;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
