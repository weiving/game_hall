<template>
  <div id="recharge" class="page-wrap">
    <div class="page-head">
      <div class="title">充值</div>
    </div>
    <div class="page-content">
      <div class="payment-wrap">
        <!--<div class="payment-item active">-->
        <!--<img src="/static/img/pay.png"/>-->
        <!--<div class="payment">-->
        <!--<div class="title">银行卡支付</div>-->
        <!--<div class="des">单笔限额5万，单日限额5万</div>-->
        <!--</div>-->
        <!--<div class="selected"></div>-->
        <!--</div>-->
        <!--<div class="payment-item">-->
        <!--<img src="/static/img/alipay02.png"/>-->
        <!--<div class="payment">-->
        <!--<div class="title">支付宝</div>-->
        <!--<div class="des">单笔限额5万，快速到账</div>-->
        <!--</div>-->
        <!--<div class="selected"></div>-->
        <!--</div>-->
        <!--<div class="payment-item">-->
        <!--<img src="/static/img/wx02.png"/>-->
        <!--<div class="payment">-->
        <!--<div class="title">微信支付</div>-->
        <!--<div class="des">支持微信5.0以上客户端</div>-->
        <!--</div>-->
        <!--<div class="selected"></div>-->
        <!--</div>-->
        <div class="payment-title">在线充值</div>
        <div class="payment-list">
          <!--<div class="payment-item active">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <!--<div class="payment-item ">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <!--<div class="payment-item ">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <div class="payment-item" v-for="(item,index) in payAccountList" :key="index"
               :class="{active:isSelectIndex==index&&selectPayType=='online'}" @click="selectIndex('online',index)">
            <img src="/static/img/pay.png"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔限额{{item.pay_max}}万，单日限额5万</div>
            </div>
            <div class="selected"></div>
          </div>
        </div>
        <div class="payment-title">普通入款</div>
        <div class="payment-list">
          <!--<div class="payment-item active">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <!--<div class="payment-item ">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <!--<div class="payment-item ">-->
          <!--<img src="/static/img/pay.png"/>-->
          <!--<div class="payment">-->
          <!--<div class="title">银行卡支付</div>-->
          <!--<div class="des">单笔限额5万，单日限额5万</div>-->
          <!--</div>-->
          <!--<div class="selected"></div>-->
          <!--</div>-->
          <div class="payment-item" v-for="(item,index) in payAccountList" :key="index"
               :class="{active:isSelectIndex==index && selectPayType=='unOnline'}"
               @click="selectIndex('unOnline',index)">
            <img src="/static/img/pay.png"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔限额{{item.pay_max}}万，单日限额5万</div>
            </div>
            <div class="selected"></div>
          </div>
        </div>
      </div>
      <div class="default-btn active" @click="toNext">下一步</div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";

  export default {
    name: "recharge",
    created() {
      this.getPayAccountList();
    },
    data() {
      return {
        payAccountList: '',
        isSelectIndex: 0,
        selectPayType: 'online',
      }
    },
    methods: {
      getPayAccountList() {
        var session = getLocalStorage("session");
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        this.$http
          .post(`${this.$api}/v1/pay/r/find_pay_account_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            console.log('支付列表', resData)
            if (resData.success == true) {
              this.payAccountList = resData.data;
            }
          })
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      /*选择支付方式*/
      selectIndex(type, index) {
        this.selectPayType = type;
        this.isSelectIndex = index;
      },
      /*选择支付*/
      toNext() {
        if (this.selectPayType == 'online') {
          var this_pay = this.payAccountList[this.isSelectIndex];
          setLocalStorage('pay_url', this_pay.pay_url);
          setLocalStorage('pay_min', this_pay.pay_min);
          setLocalStorage('pay_max', this_pay.pay_max);
          this.$root.Bus.$emit('toggleComponent', 'onlinePay')


          // console.log('在线充值')
          // /*哪种支付*/
          // var this_pay = this.payAccountList[this.isSelectIndex];
          //
          // var pay_type = this_pay.pay_type;
          // var pay_url = this_pay.pay_url;
          //
          // var money = this.val;
          // var pay_account_id = this_pay.aid;
          //
          // var user_id = getLocalStorage('user_id');
          // var username = getLocalStorage('username');
          // var session = getLocalStorage('session');
          //
          //
          // if (pay_type == 2) {//银行支付
          //   console.log('银行支付');
          //
          // } else if (pay_type == 1) {//第三方
          //   console.log('第三方支付');
          //
          //   this.toPayPage = false;
          //   this.payUrl = pay_url;
          //   this.payUrl = 'http://baidu.com';
          //   var params = new URLSearchParams();
          //   params.append('money', money);
          //   params.append('pay_account_id', pay_account_id);
          //
          //   this.$http
          //     .post(`${this.$api}/v1/pay/r/create_pay_order/${user_id}/${username}?session=${session}`, params)
          //     .then(res => {
          //       var resData = res.data;
          //       console.log('第三方创建支付订单', resData);
          //       if (resData.success == true) {
          //         console.log('创建订单成功', resData.data.msg);
          //       } else {
          //         console.log('创建订单失败', resData.data.msg);
          //       }
          //     })
          // } else {
          //   //未分类
          // }
        } else {

          var this_pay = this.payAccountList[this.isSelectIndex];
          setLocalStorage('pay_url', this_pay.aid);
          setLocalStorage('pay_min', this_pay.pay_min);
          setLocalStorage('pay_max', this_pay.pay_max);
          this.$root.Bus.$emit('toggleComponent', 'ordinaryPay')
        }
      },
      /*关闭支付*/
      closePayPage() {
        this.toPayPage = true
      }
    }
  }
</script>

<style scoped>

</style>
