<template>
  <div id="manageCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">银行卡管理</div>
    </div>
    <div class="page-content">
      <div class="card-list" v-if="bankCardList.length>0">
        <div class="card-item" v-for="(item,index) in bankCardList" @click="selectCard(item.bank_id)">
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
      <div class="bind-card" @click="toComponent('bindCard')">
        <div class="add-btn">
          <div class="add-icon">＋</div>
          <div class="text">添加银行卡</div>
        </div>
      </div>
      <div class="opt-box" v-show="isShowOpt">
        <div class="box-item">
          <!--<div class="opt-btn card-line">修改银行卡</div>-->
          <div class="opt-btn">设置默认银行卡</div>
        </div>
        <div class="box-item">
          <div class="opt-btn card-line">锁定银行卡</div>
          <div class="opt-btn" @click="delCard">删除银行卡</div>
        </div>
      </div>
      <div class="del-card" v-show="isShowFundsPwd">
        <div class="box-item">
          <div class="title">请输入资金密码</div>
          <div class="row">
            <div class="col-xs-4">资金密码：</div>
            <div class="col-xs-8"><input type="text" placeholder="请输入资金密码"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isShowOpt" @click="hideOptMask"></div>
    <div class="mask" v-show="isShowFundsPwd" @click="hideOptMask"></div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "manage-card",
    data() {
      return {
        bankCardList: [],
        isShowOpt: false,
        isShowFundsPwd: false,
        selectCardId: '',
      }
    },
    created() {
      this.getBankCardList();
    },
    methods: {
      getBankCardList() {
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');
        var session = getLocalStorage('session');

        this.$http
          .post(`${this.$api}/v1/bank/r/find_user_bank_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            // console.log('用户银行卡列表', resData);
            if (resData.success == true) {
              this.bankCardList = resData.data;
            }
          })
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      selectCard(id) {
        this.isShowOpt = true;
        this.selectCardId = id;
        console.log('id', id);
      },
      hideOptMask() {
        this.isShowOpt = false;
      },
      delCard() {
        this.isShowOpt = false;
        this.isShowFundsPwd = true;
      }
    }
  }
</script>

<style scoped>

</style>
