<template>
  <div id="bindCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('manageCard')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">绑定银行卡</div>
    </div>
    <div class="page-content">
      <div class="info-title">请输入您的身份信息</div>
      <div class="info-box">
        <div class="info-item">
          <span>真实姓名</span>
          <input type="text" class="" v-model="card_user">
        </div>
        <!--<div class="info-item">-->
        <!--<span>身份证号</span>-->
        <!--<input type="text" class="" value="894131653254913156464">-->
        <!--</div>-->
      </div>
      <div class="info-title">请输入您的银行卡信息
        <div class="tips"><i class="icon"></i>支持银行及限额</div>
      </div>
      <div class="info-box">
        <div class="info-item">
          <span>银行卡号</span>
          <input type="text" class="" v-model="card_no">
        </div>
        <div class="info-item" @click="showBankCardList">
          {{bank_name}}
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <div class="info-item">
          <span>开户地区</span>
          <input type="text" class="" value="罗麟">
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <!--<div class="info-item">-->
        <!--<span>手机号</span>-->
        <!--<input type="text" class="" value="15461234564">-->
        <!--</div>-->
        <!--<div class="info-item">-->
        <!--<span>短信验证</span>-->
        <!--<input type="text" class="" value="" placeholder="输入短信验证码">-->
        <!--<div class="get-code">获取验证码</div>-->
        <!--</div>-->
        <div class="info-item">
          <span>资金密码</span>
          <input type="text" class="" v-model="funds_password">
        </div>
      </div>
      <div class="default-btn">确认绑定</div>

      <transition name="slideRight">
        <div class="slide-popover" v-show="isShowMask">
          <div class="title">请选择储蓄卡所属银行</div>
          <div class="bankCardList">
            <div class="bankCard-item" v-for="(item,index) in bankCardList" :key="item.bank_id"
                 @click="selectBankCardList(item.bank_id,item.bank_name)">
              <img src="/static/img/pay.png" alt="">
              <div class="bankCardInfo">
                <div class="bankName">{{item.bank_name}}</div>
                <div class="des">单笔限额5万,日限额5万</div>
              </div>
              <div class="select-radio active"><i></i></div>
            </div>
          </div>
        </div>
      </transition>

    </div>
    <!--<div class="mask" v-show="isShowMask" @click="toggleBankCardList"></div>-->
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "bind-card",
    data() {
      return {
        funds_password: '',
        bank_id: '',
        bank_name: '',
        card_no: '',
        card_user: '',
        card_addr: '',
        isShowMask: false,
        bankCardList: ''
      }
    },
    created() {
      this.getBankCardList();
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getBankCardList() {
        var session = getLocalStorage('session');
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');

        this.$http
          .post(`${this.$api}/v1/bank/r/find_bank_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            console.log('银行列表', resData);
            if (resData.success == true) {
              this.bankCardList = resData.data;
            }


          })
      },
      showBankCardList() {
        this.isShowMask = true;

      },
      selectBankCardList(bank_id, bank_name) {
        this.isShowMask = false;
        this.bank_name = bank_name;
      },

    }
  }
</script>

<style scoped>

</style>
