<template>
  <div id="selectCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('recharge')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">选择银行卡</div>
    </div>
    <div class="page-content">
      <div class="box-item card-box" v-for="(item,index) in cardList">
        <div class="card-logo">招商</div>
        <div class="card-name">招商银行</div>
        <div class="cardID">6236 **** **** 8889</div>
        <div class="card-owner">
          <span>持卡人:</span>
          <div class="owner">罗**</div>
        </div>
      </div>
      <div class="box-item" @click="toComponent('bindCard')">
        <div class="ellipsis-icon text-right">****</div>
        <div class="ellipsis-icon text-right">****</div>
        <div class="add-btn"></div>
        <div class="ellipsis-icon text-left">****</div>
        <div class="ellipsis-icon text-left">****</div>
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
        cardList: [],
      }
    },
    created() {
      this.getCardList();
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getCardList() {
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');
        var session = getLocalStorage('session');

        this.$http
          .post(`${this.$api}/v1/bank/r/find_user_bank_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            console.log('33', res.data);
            if (res.data.success == true) {
              this.cardList = res.data.data;
            }
          })
      },

    }
  }
</script>

<style scoped>

</style>
