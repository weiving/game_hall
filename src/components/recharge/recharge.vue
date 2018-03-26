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
          <div class="payment-item" v-for="(item,index) in onlinePayTypeList" :key="index"
               :class="{active:isSelectIndex==index&&selectPayType=='online'}" @click="selectIndex('online',index)">
            <img src="/static/img/pay.png"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔最小金额{{item.pay_min}}万，最大金额{{item.pay_max}}万</div>
            </div>
            <div class="selected"></div>
          </div>
          <div class="no-pay" v-if="onlinePayTypeList.length==0">
            暂无支付方式
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
          <div class="payment-item" v-for="(item,index) in otherPayTypeList" :key="index"
               :class="{active:isSelectIndex==index && selectPayType=='unOnline'}"
               @click="selectIndex('unOnline',index)">
            <img src="/static/img/pay.png"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔最小金额{{item.pay_min}}万，最大金额{{item.pay_max}}万</div>
            </div>
            <div class="selected"></div>
          </div>
          <div class="no-pay" v-if="otherPayTypeList.length==0">
            暂无支付方式
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
        onlinePayTypeList: '',//payAccountList
        otherPayTypeList: '',
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
              var onlineList = [];
              var otherList = [];
              for (var i = 0; i < resData.data.length; i++) {
                if (resData.data[i].pay_type == "2") {
                  onlineList.push(resData.data[i]);//在线支付
                } else {
                  otherList.push(resData.data[i]);
                }
              }
              this.onlinePayTypeList = onlineList;
              this.otherPayTypeList = otherList;
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

        var session = getLocalStorage("session");
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        this.$http
          .post(`${this.$api}/v1/pay/r/find_pay_account_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData=res.data;
          })

        if (this.selectPayType == 'online') {
          var this_pay = this.onlinePayTypeList[this.isSelectIndex];
          setLocalStorage('pay_url', this_pay.pay_url);
          setLocalStorage('pay_min', this_pay.pay_min);
          setLocalStorage('pay_max', this_pay.pay_max);
          this.$root.Bus.$emit('toggleComponent', 'onlinePay')
        } else {
          var this_pay = JSON.stringify(this.otherPayTypeList[this.isSelectIndex]);
          console.log('普通入款', this_pay);
          setLocalStorage('payInfo', this_pay);
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
