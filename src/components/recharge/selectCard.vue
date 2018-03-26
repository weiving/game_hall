<template>
  <div id="selectCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('withdraw')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">选择银行卡</div>
    </div>
    <div class="page-content">
      <div class="card-list" v-if="bankCardList.length>0">
        <div class="card-item" v-for="(item,index) in bankCardList" @click="selectWithdrawCard()">
          <div class="card-logo">
            <img :src="'/static/img/bank/bank-'+item.bank_id+'.png'" :alt=item.bank_name>
          </div>
          <div class="card-name">{{item.bank_name}}</div>
          <div class="cardID">{{item.card_no}}</div>
          <div class="card-owner">
            <span>持卡人:</span>
            <div class="owner">{{item.card_user}}</div>
          </div>
        </div>
      </div>
      <div class="box-item" v-else>
        <p>暂无银行卡绑定</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "select-card",
    data() {
      return {
        bankCardList: [],
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
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');
        var session = getLocalStorage('session');

        this.$http
          .post(`${this.$api}/v1/bank/r/find_user_bank_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.bankCardList = resData.data;
              console.log('选择提现的银行卡', resData.data);
            }
          })
      },
      selectWithdrawCard() {
        console.log('选择')
      }
    }
  }
</script>

<style scoped>

</style>
