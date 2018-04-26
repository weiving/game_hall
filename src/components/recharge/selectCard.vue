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

<style scoped lang="less">
  #selectCard {
    .card-list {
      .card-item {
        margin: 18px auto;
        border-radius: 10px;
        font-size: 18px;
        width: 353px;
        height: 176px;
        background: url("/static/img/bankbg.png");
        background-size: cover;
        position: relative;
        color: #ffffff;
        .card-logo {
          width: 45px;
          height: 45px;
          line-height: 45px;
          background: #ffffff;
          border-radius: 50%;
          text-align: center;
          position: absolute;
          top: 20px;
          left: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .card-name {
          width: 100px;
          height: 45px;
          line-height: 45px;
          margin-left: 5px;
          position: absolute;
          top: 20px;
          left: 80px;
        }
        .cardID {
          margin-left: 5px;
          position: absolute;
          top: 80px;
          left: 80px;
        }
        .card-owner {
          position: absolute;
          bottom: 20px;
          left: 20px;
          span {
            display: inline-block;
          }
          .owner {
            display: inline-block;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
