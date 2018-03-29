<template>
  <div id="withdraw" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">提现</div>
      <div class="page-head-btn" @click="toComponent('capitalRecord')">资金流水</div>
    </div>
    <div class="page-content">
      <div class="withdraw-bank" v-if="defaultBank" @click="toComponent('selectCard')">
        <div class="bank-logo">
          <div class="logo-icon">
            <img :src="'/static/img/bank/bank-'+defaultBank.bank_id+'.png'" alt="">
          </div>
        </div>
        <div class="bankInfo">
          <div class="bankName">{{defaultBank.bank_name}}</div>
          <div class="bankCardCode">{{defaultBank.card_no}}</div>
          <div class="username">{{defaultBank.card_user}}</div>
        </div>
        <div class="select-more">
          <div class="more-icon"></div>
        </div>
      </div>
      <div class="unBankCard" v-else>
        暂无绑定银行卡, 去<span class="toBind" @click="toComponent('bindCard')">绑定</span>
      </div>
      <div class="withdraw-money">
        <div class="balance">
          <div class="text">可提现余额：￥</div>
          <div class="number">{{balance}}</div>
          <div class="all-btn" @click="selectAllBalance">全部</div>
        </div>
        <div class="input-box" @touchstart.stop="focus">
          <div class="text">￥</div>
          <div class="margin-input">
            <div class="amount" v-show="val">{{val}}</div>
            <div class="placeholder" v-show="val.length===0">请输入提现金额(≥￥100)</div>
            <!--光标-->
            <div class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></div>
          </div>
        </div>
        <div class="input-pas">
          <div class="label">资金密码</div>
          <input type="password" v-model="funds_password" class="fun-password" placeholder="请输入密码">
        </div>
      </div>
      <div class="default-btn" :class="{active:val.length>0 && funds_password.length>0}" @click="withdrawBalance">提现
      </div>
      <div class="prompt-box">
        <div class="title">温馨提示：</div>
        <p>1.提现需达投注量：9210.00;</p>
        <p>2.当前已达到：9910.00;</p>
        <p>3.是否可以提款：<span class="text-red">是</span>，手续费：<span class="text-red">3</span>元</p>
        <p>4.提现金额最低100元，最高300000元</p>
      </div>
      <keyboard :show="keyboard" @typing="typing" @complete="blur"></keyboard>
    </div>
    <div class="mask" v-show="isShowMask" @click="hideMask"></div>
    <div class="mask-text" v-show="isShowMask" @click="hideMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage, removeLocalStorage} from "../../../static/js/util";
  import keyboard from './keyboard'

  export default {
    name: "withdraw",
    components: {
      keyboard
    },
    created() {
      document.addEventListener('touchstart', () => {
        this.blur();
      });
      this.getBankCard();
      this.getBalance();
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
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        session: getLocalStorage('session'),
        defaultBank: '',
        uid: '',
        balance: '',
        funds_password: '',
        isShowMask: false,
        msg: '',
      }
    },
    methods: {
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
        /*提现金额不能大于余额*/
        if (parseFloat(this.val) > this.balance) {
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

      getBankCard() {
        var selectedBankCard = getLocalStorage('selectedBankCard');
        if (selectedBankCard == undefined || selectedBankCard == '') {
          this.$http
            .post(`${this.$api}/v1/bank/r/find_user_bank_list/${this.user_id}/${this.username}?session=${this.session}`)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                for (var i = 0; i < resData.data.length; i++) {
                  if (resData.data[i].is_default == 1) {
                    this.defaultBank = resData.data[i];
                    this.uid = resData.data[i].uid;
                    // console.log('默认', this.defaultBank);
                  }
                }
              }
            })
        } else {
          var bankData = JSON.parse(selectedBankCard);
          this.defaultBank = bankData;
          this.uid = bankData.uid;
        }
      },

      getBalance: function () {
        this.$http
          .post(`${this.$api}/v1/wallet/r/get_user_balance/${this.user_id}/${this.username}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.balance = resData.data.balance;
            } else {
              this.isShowMask = false;
              this.msg = resData.msg;
            }
          })
      },

      selectAllBalance() {
        this.val = this.balance;
      },

      withdrawBalance() {
        var params = new URLSearchParams();
        params.append('funds_password', this.funds_password);
        params.append('money', this.val);
        params.append('uid', this.uid);

        this.$http
          .post(`${this.$api}/v1/draw/w/create_draw_order/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            // console.log('提现', resData);
            if (resData.success == true) {
              this.isShowMask = true;
              this.msg = resData.msg;
              var that = this;
              setTimeout(function () {
                that.$root.Bus.$emit('toggleComponent', 'my')
              }, 1500)
            } else {
              this.isShowMask = true;
              this.msg = resData.msg;
            }
          }).catch(err => {
          this.isShowMask = true;
          this.msg = err.data.msg;
        })
      },

      hideMask() {
        this.isShowMask = false;
        this.msg = '';
      }
    },
    destroyed() {
      removeLocalStorage('selectedBankCard')
    }
  }
</script>

<style scoped>

</style>
