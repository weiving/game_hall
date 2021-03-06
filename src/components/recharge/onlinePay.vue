<template>
  <div id="onlinePay" class="page-wrap">
    <div class="pay-money" v-if="toPayPage">
      <div class="page-head">
        <div class="toReturn" @click="toComponent('recharge')">
          <img src="/static/img/left.png" alt="">
        </div>
        <div class="title">在线充值</div>
        <div class="page-head-btn" @click="toComponent('capitalRecord')">资金流水</div>
      </div>
      <div class="page-content">
        <div class="input-box" @touchstart.stop="focus">
          <div class="text">￥</div>
          <div class="margin-input">
            <div class="amount" v-show="val">{{val}}</div>
            <div class="placeholder" v-show="val.length===0">请输入充值金额</div>
            <!--光标-->
            <div class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></div>
          </div>
        </div>
        <div class="des-box">
          <p>单笔充值限额：最低<i class="text-red">{{payMin}}</i>元，最高<i class="text-red">{{payMax}}</i>元</p>
        </div>

        <div class="default-btn" :class="{active:this.val}" @click="toOnlinePay()">
          提交并前往充值
        </div>
        <div class="prompt-box">
          <div class="title">温馨提示：</div>
          <p class="text-red">注:支付金额必加个尾数，如1888.7方便专员核对查收;</p>
          <p>1.转账说明或付款备注请填写您的唯一充值码4663;</p>
          <p>2.银行卡入款支持所有银行卡转账;</p>
          <p>3.正确填写付款人姓名，可以提高到账速度;</p>
          <p>4.请务必先转账成功后在点击提交申请存款式信息</p>
        </div>
        <keyboard :show="keyboard" @typing="typing" @complete="blur"></keyboard>
      </div>
    </div>
    <div class="pay-frame" v-else>
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
  import {getLocalStorage,removeLocalStorage} from "../../../static/js/util";
  import keyboard from './keyboard';

  export default {
    name: "online-pay",
    components: {
      keyboard
    },
    created() {
      this.getOnlinePayInfo();
      document.addEventListener('touchstart', () => {
        this.blur();
      })
    },
    data() {
      return {
        cursor: false,
        keyboard: false,
        val: '',
        aIllegal: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0..', '.'],
        cursorDuration: 600,
        inter: 8,
        decimal: 2,
        toPayPage: true,
        payUrl: '',
        payMin: '0.00',
        payMax: '0.00',
      }
    },
    methods: {
      getOnlinePayInfo() {
        this.payUrl = getLocalStorage('pay_url');
        this.payMin = getLocalStorage('pay_min');
        this.payMax = getLocalStorage('pay_max');
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
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
        /*通知父组件，值出来了*/
        /*检验用户输入的金额不是为0，如果是的话，直接重置*/
        this.checkValue();
        this.notify();

      },
      checkValue() {
        if (parseInt(this.val) === 0) {
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
        /*删除值并不会出发值得校验，所以需要手动再触发一次*/
        this.val = this.val.slice(0, -1);
        this.notify();
      },
      /*输入*/
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

      /*提交并前往充值*/
      toOnlinePay() {
        if (this.val) {
          this.toPayPage = false;
        }
      },
      //关闭充值
      closePayPage() {
        this.toPayPage = true;
      }

    },
    destroyed(){
      removeLocalStorage('pay_url');
      removeLocalStorage('pay_min');
      removeLocalStorage('pay_max');
    }
  }
</script>

<style scoped lang="less">
  #onlinePay {
    .pay-money {
      .page-content {

        .input-box {
          width: 100%;
          height: 60px;
          line-height: 26px;
          //margin-bottom: 10px;
          padding: 17px 13px;
          background: #ffffff;
          box-shadow: 0 0 5px 2px #EEF7FE;

          .text {
            font-size: 18px;
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
              width: 180px;
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

        .des-box {
          height: 40px;
          line-height: 40px;
          background: #ffffff;
          p {
            margin-left: 10px;
            margin-right: 10px;
            border-top: 1px solid #E9E9E9;
            color: #A0A0A0;
            padding-left: 10px;
          }
        }

        .payer-box {
          height: 50px;
          //line-height: 50px;
          margin-top: 20px;
          background: #ffffff;
          padding: 17px 12px;
          .text {
            font-size: 18px;
            margin-left: 12px;
            float: left;
          }
          .margin-input {
            width: 250px;
            margin-left: 10px;
            float: left;
            input {
              width: 100%;
            }
          }
        }

        .prompt-box {
          margin: 25px 12px;
          .title {
            font-size: 18px;
            color: #B8BABC;
            margin-bottom: 14px;
          }
          p {
            margin-bottom: 10px;
            color: #B8BABC;
            &.text-red {
              color: red;
            }
          }
        }
      }
    }
    .pay-frame {
      height: 100%;
      width: 100%;
      .page-head {
        .toReturn {

          img {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -12px;
            margin-left: -12px;
          }
        }
      }
      .page-content {
        iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
