<template>
  <div id="recharge" class="page-wrap">
    <div class="pay-select" v-if="toPayPage">
      <div class="page-head">
        <!--<div class="toReturn" @click="toUrl('hall')">-->
        <!--<img src="/static/img/left.png" alt="">-->
        <!--</div>-->
        <div class="title">充值</div>
      </div>
      <div class="page-content">
        <div class="input-box" @touchstart.stop="focus">
          <div class="text">金额：</div>
          <div class="margin-input">
            <div class="amount" v-show="val">{{val}}</div>
            <div class="placeholder" v-show="val.length===0">请输入充值金额</div>
            <!--光标-->
            <div class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></div>
          </div>
          <!--清空-->
          <!--<div class="empty-btn" v-show="val">111-->
          <!--<i class="empty-icon"></i>-->
          <!--</div>-->
        </div>
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

          <div class="payment-item" v-for="(item,index) in payAccountList" :key="index"
               :class="{active:isSelectIndex==index}" @click="selectIndex(index)">
            <img src="/static/img/pay.png"/>
            <div class="payment">
              <div class="title">{{item.pay_alias}}</div>
              <div class="des">单笔限额{{item.pay_max}}万，单日限额5万</div>
            </div>
            <div class="selected"></div>
          </div>
        </div>
        <div class="default-btn" :class="{active:val}" @click="toNext">下一步</div>
        <keyboard :show="keyboard" @typing="typing" @complete="blur"></keyboard>
      </div>
    </div>
    <div class="pay-page" v-else>
      <div class="page-head">
        <div class="toReturn" @click="closePayPage">
          <img src="/static/img/close.png" alt="关闭">
        </div>
      </div>
      <div class="page-content">
        <iframe :src=payUrl frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";
  import keyboard from './keyboard'

  export default {
    name: "recharge",
    components: {
      keyboard
    },
    created() {
      document.addEventListener('touchstart', () => {
        this.blur();
      });
      this.getPayAccountList();

    },
    props: {},
    data() {
      return {
        cursor: false,
        keyboard: false,
        val: '',
        aIllegal: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0..', '.'],
        cursorDuration: 600,
        bodyHeight: '',
        bodyOverflow: '',
        // value: '',
        inter: 8,
        decimal: 2,
        payAccountList: '',
        isSelectIndex: 0,
        toPayPage: true,
        payUrl: 'http://www.baidu.com'
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
      focus() {
        /*显示键盘*/
        this.showKeyboard();
        /*显示光标*/
        this.showCursor();
        /*闪烁光标*/
        this.blinkCursor();
      },
      blinkCursor() {
        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => {
          this.cursor = !this.cursor;
        }, this.cursorDuration);
      },
      unblinkCursor() {
        clearInterval(this.intervalID);
      },
      showKeyboard() {
        this.keyboard = true;
      },
      hideKeyboard() {
        this.keyboard = false;
      },
      showCursor() {
        this.cursor = true;
      },
      hideCursor() {
        this.cursor = false;
      },

      blur() {
        /*隐藏光标*/
        this.hideCursor();
        /*停止光标闪烁*/
        this.unblinkCursor();
        /*隐藏键盘*/
        this.hideKeyboard();
        /*附加00，如果用户输入了一个以.结尾的值就点完成了，那么这个时候就在后面加上00*/
        this.toCompletion();
        /*通知父组件,值出来了*/
        /*校验用户输入的金额是不是为0，如果是的话，直接重置*/
        this.checkValue();
        this.notify();

      },
      checkValue() {
        if (parseFloat(this.val) === 0) {
          this.val = '';
        }
      },
      /*判断是否需要加0*/
      toCompletion() {
        let list = this.val.split('.');
        if (typeof list[1] === 'undefined') {
          if (this.val !== '') {
            this.val = this.val + '.';
            this.completion(this.decimal);
          }
        } else {
          if (list[1].length < this.decimal) {
            this.completion(this.decimal - list[1].length);
          }
        }
      },
      completion(len) {
        let v = '';
        for (let i = 0; i < len; i++) {
          v = v + '0';
        }
        this.val = this.val + v;
      },
      notify() {
        this.$emit('input', this.val);
      },
      del() {
        /*删除值并不会触发值的校验，所以需要手动再出发一次*/
        this.val = this.val.slice(0, -1);
        this.notify();
      },
      /*输入*/
      typing(value) {
        /*如果是点击删除*/
        if (value === '') {
          this.del();
        }
        /*保存旧的值*/
        let oldValue = this.val;
        /*获取新的值*/
        this.val = this.val + value;
        /*检验新值，如果没有通过检测，恢复值*/
        if (!this.passCheck(this.val)) {
          this.val = oldValue;
          return;
        }
        /*为了让外界同步输入，需要发送事件*/
        this.notify();
      },
      passCheck(val) {
        /*验证规则*/
        let aRules = [
          this.illegalInput,
          this.illegalValue,
          this.accuracy
        ]
        return aRules.every((item) => {
          return item(val);
        })
      },
      illegalInput(val) {
        if (this.aIllegal.indexOf(val) > -1) {
          return false;
        }
        return true;
      },
      /*非法值*/
      illegalValue(val) {
        if (parseFloat(val) != val) {
          return false;
        }
        return true;
      },
      /*验证精度*/
      accuracy(val) {
        let v = val.split('.');
        if (v[0].length > this.inter) {
          return false;
        }
        if (v[1] && (v[1].length) > this.decimal) {
          return false;
        }
        return true;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      /*选择支付方式*/
      selectIndex(index) {
        this.isSelectIndex = index;
      },
      /*选择支付*/
      toNext() {
        if (this.val) {
          console.log('jindd');
          /*哪种支付*/
          var this_pay = this.payAccountList[this.isSelectIndex];

          var pay_type = this_pay.pay_type;
          var pay_url = this_pay.pay_url;

          var money = this.val;
          var pay_account_id = this_pay.aid;

          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');
          var session = getLocalStorage('session');


          if (pay_type == 2) {//银行支付
            console.log('银行支付');

          } else if (pay_type == 1) {//第三方
            console.log('第三方支付');

            this.toPayPage = false;
            // this.payUrl = pay_url;
            this.payUrl = 'http://baidu.com';
            var params = new URLSearchParams();
            params.append('money', money);
            params.append('pay_account_id', pay_account_id);

            this.$http
              .post(`${this.$api}/v1/pay/r/create_pay_order/${user_id}/${username}?session=${session}`, params)
              .then(res => {
                var resData = res.data;
                console.log('第三方创建支付订单', resData);
                if (resData.success == true) {
                  console.log('创建订单成功', resData.data.msg);
                } else {
                  console.log('创建订单失败', resData.data.msg);
                }
              })
          } else {
            //未分类
          }
        }
      },
      /*关闭支付*/
      closePayPage() {
        this.toPayPage = true
      }
    }
  }
</script>

<style scoped lang="less">
  #recharge {
    width: 100%;
    height: 100%;
    background: #F7FBFF;
    display: flex;
    flex-direction: column;

    .pay-select {
      .recharge-head {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #5D97F9;
        color: #fff;
        text-align: center;
        position: relative;
        font-size: 20px;

        .toHall {
          position: absolute;
          top: 5px;
          left: 0px;
          width: 40px;
          height: 40px;

          img {
            width: 11px;
            height: 19px;
            vertical-align: text-top;
          }

        }
      }

      .recharge-content {
        font-size: 14px;
        user-select: none;
        .input-box {
          width: 100%;
          height: 50px;
          line-height: 16px;
          margin-top: 10px;
          margin-bottom: 10px;
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
              color: #999999;
            }

            .cursor {
              float: left;
              background-color: #4788c5;
              height: 16px;
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
          margin-top: 20px;
          background: #ffffff;
          box-shadow: 0 0 5px 2px #EEF7FE;

          .payment-item {
            height: 60px;
            width: 100%;
            margin-left: 20px;
            border-bottom: 1px solid #EBEBEB;
            position: relative;
            padding-top: 16px;
            padding-left: 35px;
            img {
              width: 30px;
              height: 30px;
              position: absolute;
              top: 18px;
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
                right: 40px;
              }
            }

            &:last-child {
              border: none;
            }
          }
        }

        .next-btn {
          width: 94%;
          margin-top: 37px;
          margin-left: 3%;
          height: 40px;
          line-height: 40px;
          background: #cccccc;
          border-radius: 6px;
          color: #ffffff;
          text-align: center;

          &.active {
            background: #6092F4;
          }
        }
      }
    }

  }
</style>
