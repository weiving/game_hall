<template>
  <div id="recharge" class="page-wrap">
    <div class="page-head">
      <div class="title">充值</div>
    </div>
    <div class="page-content">
      <div class="payment-wrap">
        <div class="payment-title">在线充值</div>
        <div class="payment-list">
          <div class="payment-item" v-for="(item,index) in onlinePayTypeList" :key="index"
               :class="{active:isSelectIndex==index&&selectPayType=='online'}" @click="selectIndex('online',index)">
            <img src="/static/img/pay.png" v-if="item.category==1" alt="银行卡"/>
            <img src="/static/img/bank/bank-123.png" v-else-if="item.category==2" alt="微信"/>
            <img src="/static/img/bank/bank-121.png" v-else-if="item.category==3" alt="支付宝"/>
            <img src="/static/img/bank/bank-122.png" v-else="item.category==4" alt="财付通"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔最小金额{{item.pay_min}}元，最大金额{{item.pay_max}}元</div>
            </div>
            <div class="selected"></div>
          </div>
          <div class="no-pay" v-if="onlinePayTypeList.length==0">
            暂无支付方式
          </div>
        </div>
        <div class="payment-title">普通入款</div>
        <div class="payment-list">
          <div class="payment-item" v-for="(item,index) in otherPayTypeList" :key="index"
               :class="{active:isSelectIndex==index && selectPayType=='unOnline'}"
               @click="selectIndex('unOnline',index)">
            <img :src="'/static/img/bank/bank-'+item.pay_id+'.png'"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔最小金额{{item.pay_min}}元，最大金额{{item.pay_max}}元</div>
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
        session: getLocalStorage("session"),
        user_id: getLocalStorage("user_id"),
        username: getLocalStorage("username"),
      }
    },
    methods: {
      getPayAccountList() {
        this.$http
          .post(`${this.$api}/v1/pay/r/find_pay_account_list/${this.user_id}/${this.username}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
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
        var that = this;
        this.$http
          .post(`${this.$api}/v1/pay/r/get_unpaid_order/${this.user_id}/${this.username}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
            // console.log('是否有未支付的订单', resData);
            var dataString = JSON.stringify(resData.data);
            if (dataString != '{}') {
              //存在未支付的订单
              setLocalStorage('orderInfo', dataString);
              that.$root.Bus.$emit('toggleComponent', 'ordinaryOrder');
            } else {
              //没有未支付的订单
              if (that.selectPayType == 'online') {
                var this_pay = that.onlinePayTypeList[that.isSelectIndex];
                setLocalStorage('pay_url', this_pay.pay_url);
                setLocalStorage('pay_min', this_pay.pay_min);
                setLocalStorage('pay_max', this_pay.pay_max);
                that.$root.Bus.$emit('toggleComponent', 'onlinePay')
              } else {
                var this_pay = that.otherPayTypeList[that.isSelectIndex];
                // console.log('普通支付', this_pay);
                var orderInfo = {
                  account_id: this_pay.account_id,
                  pay_account: this_pay.account,
                  pay_account_addr: this_pay.address,
                  pay_account_user: this_pay.account_user,
                  pay_alias: this_pay.pay_alias,
                  pay_id: this_pay.pay_id,
                  pay_type: this_pay.pay_type,
                  pay_url: this_pay.pay_url,
                  pay_min: this_pay.pay_min,
                  pay_max: this_pay.pay_max,
                };
                // console.log('普通', orderInfo);
                setLocalStorage('orderInfo', JSON.stringify(orderInfo));
                that.$root.Bus.$emit('toggleComponent', 'ordinaryPay')
              }
            }
          });

      },
      /*关闭支付*/
      closePayPage() {
        this.toPayPage = true
      }
    }
  }
</script>

<style scoped lang="less">
  /*充值*/
  #recharge {
    .page-content {
      font-size: 16px;
      user-select: none;
      .input-box {
        width: 100%;
        height: 60px;
        line-height: 26px;
        //margin-bottom: 10px;
        padding: 17px 13px;
        background: #ffffff;
        box-shadow: 0 0 5px 2px #EEF7FE;

        .text {
          margin-left: 12px;
          float: left;
        }

        .margin-input {
          margin-left: 10px;
          float: left;
          position: relative;

          .amount {
            float: left;
            color: #999999;
          }

          .placeholder {
            width: 120px;
            position: absolute;
            top: 0px;
            left: 2px;
            color: #C5C5C5;
          }

          .cursor {
            float: left;
            background-color: #4788c5;
            height: 26px;
            width: 2px;
            margin-left: 2px;
          }
        }

        .empty-btn {
          width: 34px;
          height: 34px;
          position: absolute;
          top: 0px;
          right: 10px;
        }
      }
      .payment-wrap {
        .payment-title {
          padding: 10px 20px;
          color: #C5C5C5;
          //box-shadow: 0 0 2px 1px #EEF7FE;
        }
        .payment-list {
          background: #ffffff;
          box-shadow: 0 0 2px 2px #EEF7FE;
          padding: 0 20px;

          .payment-item {
            height: 60px;
            width: 100%;
            border-bottom: 1px solid #EBEBEB;
            position: relative;
            padding-top: 16px;
            padding-left: 35px;
            img {
              width: 40px;
              height: 40px;
              position: absolute;
              top: 10px;
              left: -10px;
            }

            .payment {

              .des {
                margin-top: 6px;
                font-size: 12px;
                color: #999999;
              }
            }

            &.active {
              .selected {
                width: 14px;
                height: 11px;
                background: url("/static/img/dict.png");
                background-size: cover;
                position: absolute;
                top: 25px;
                right: 20px;
              }
            }

            &:last-child {
              border: none;
            }
          }

          .no-pay {
            height: 60px;
            line-height: 60px;
            width: 100%;
            position: relative;
          }
        }
        //margin-top: 20px;
        //background: #ffffff;
        //box-shadow: 0 0 5px 2px #EEF7FE;
      }

      .default-btn {
        margin-top: 37px;
      }
    }
  }

</style>
