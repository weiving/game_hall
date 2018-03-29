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
        <div class="card-item" v-for="(item,index) in bankCardList"
             @click="selectWithdrawCard(item.uid,item.bank_id,item.bank_name,item.card_user,item.card_no)">
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
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";

  export default {
    name: "select-card",
    data() {
      return {
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
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
        this.$http
          .post(`${this.$api}/v1/bank/r/find_user_bank_list/${this.user_id}/${this.username}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.bankCardList = resData.data;
            }
          })
      },
      selectWithdrawCard(uid, bank_id, bank_name, card_user, card_no) {
        var selectedBankCard = {
          uid: uid,
          bank_id: bank_id,
          bank_name: bank_name,
          card_user: card_user,
          card_no: card_no
        }
        setLocalStorage('selectedBankCard', JSON.stringify(selectedBankCard));
        this.$root.Bus.$emit('toggleComponent', 'withdraw');
      },
    }
  }
</script>

<style scoped>

</style>
