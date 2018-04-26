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
        <div class="card-item" v-for="(item,index) in bankCardList" @click="selectCard(item.uid)">
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
    </div>
    <div class="opt-box" v-show="isShowOpt">
      <div class="box-item">
        <!--<div class="opt-btn card-line">修改银行卡</div>-->
        <div class="opt-btn" @click="defaultCard">设置默认银行卡</div>
      </div>
      <div class="box-item">
        <div class="opt-btn card-line" @click="lockCard">锁定银行卡</div>
        <div class="opt-btn" @click="delCard">删除银行卡</div>
      </div>
    </div>
    <div class="mask" v-show="isShowOpt" @click="hideOptMask"></div>

    <div class="del-card" v-show="isShowFundsPwd">
      <div class="box-item">
        <div class="title">请输入资金密码</div>
        <div class="row">
          <div class="col-xs-4">资金密码：</div>
          <div class="col-xs-8"><input type="text" v-model="funds_password" placeholder="请输入资金密码"></div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <div class="btn" @click="sure_del">确认</div>
          </div>
          <div class="col-xs-6">
            <div class="btn" @click="cancel_del">取消</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isShowFundsPwd" @click="hideOptMask"></div>

    <div class="mask" v-show="isShowMask" @click="hideMask"></div>
    <div class="mask-text" v-show="isShowMask" @click="hideMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "manage-card",
    data() {
      return {
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        session: getLocalStorage('session'),
        bankCardList: [],
        isShowOpt: false,
        isShowFundsPwd: false,
        selectCardUid: '',
        funds_password: '',
        isShowMask: false,
        msg: '',
      }
    },
    created() {
      this.getBankCardList();
    },
    methods: {
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
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      selectCard(uid) {
        this.isShowOpt = true;
        this.selectCardUid = uid;
      },
      hideOptMask() {
        this.isShowOpt = false;
      },
      defaultCard() {
        var params = new URLSearchParams();
        params.append('uid', this.selectCardUid);
        this.$http
          .post(`${this.$api}/v1/bank/w/set_user_bank_default/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            this.isShowOpt = false;
            if (resData.success == true) {
              this.isShowMask = true;
              this.msg = resData.msg;
              var that = this;
              setTimeout(function () {
                that.isShowMask = false;
                that.msg = '';
              }, 1000)
            } else {
              this.isShowMask = true;
              this.msg = resData.msg;
            }
          }).catch(res => {
          this.isShowMask = true;
          this.msg = res.data.msg;
        })
      },
      lockCard() {
        var params = new URLSearchParams();
        params.append('uid', this.selectCardUid);
        this.$http
          .post(`${this.$api}/v1/bank/w/lock_user_bank/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            this.isShowOpt = false;
            if (resData.success == true) {
              this.isShowMask = true;
              this.msg = resData.msg;
              var that = this;
              setTimeout(function () {
                that.isShowMask = false;
                that.msg = '';
              }, 1000)
            } else {
              this.isShowMask = true;
              this.msg = resData.msg;
            }
          }).catch(res => {
          this.isShowMask = true;
          this.msg = res.data.msg;
        })
      },
      delCard() {
        this.isShowOpt = false;
        this.isShowFundsPwd = true;
      },
      sure_del() {
        var params = new URLSearchParams();
        params.append('funds_password', this.funds_password);
        params.append('uid', this.selectCardUid);
        this.$http
          .post(`${this.$api}/v1/bank/w/del_user_bank/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            this.isShowFundsPwd = false;
            if (resData.success == true) {
              this.isShowMask = true;
              this.msg = resData.msg;
              var that = this;
              setTimeout(function () {
                that.isShowMask = false;
                that.msg = '';
                that.getBankCardList();
              }, 1000)
            } else {
              this.isShowMask = true;
              this.msg = resData.msg;
            }
            this.funds_password = ''
          }).catch(res => {
          this.isShowMask = true;
          this.msg = res.data.msg;
          this.funds_password = ''
        })
      },
      cancel_del() {
        this.isShowFundsPwd = false;
        this.funds_password = ''
      },
      hideMask() {
        this.isShowMask = false;
        this.msg = '';
      }
    }
  }
</script>

<style scoped lang="less">
  #manageCard {
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

    .bind-card {
      margin: 28px auto;
      border-radius: 10px;
      font-size: 18px;
      width: 353px;
      height: 100px;
      background: #ffffff;
      border: 1px dashed #C3C5C8;
      color: #C3C5C8;
      .add-btn {
        width: 130px;
        height: 30px;
        line-height: 30px;
        position: relative;
        top: 50%;
        margin: -15px auto;
        .add-icon {
          height: 30px;
          line-height: 30px;
          font-size: 30px;
          float: left;
          margin-top: -2px;
        }
        .text {
          float: left;
        }
      }

    }

    .opt-box {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      color: #5D97F9;
      z-index: 101;
      .box-item {
        margin: 18px 10px;
        background-color: #ffffff;
        border-radius: 10px;
        font-size: 16px;
        position: relative;
        padding: 0;
        text-align: center;
        .card-line {
          border-bottom: solid 1px #ECECEE;
        }
        .opt-btn {
          height: 50px;
          line-height: 50px;
        }

      }
    }

    .del-card {
      width: 100%;
      position: absolute;
      top: 40%;
      z-index: 101;
      font-size: 16px;
      .box-item {
        background: #fff;
        border-radius: 10px;
        width: 320px;
        padding: 0 12px;
        margin: 0 auto;
        .title {
          height: 50px;
          line-height: 50px;
        }
        .row {
          height: 50px;
          line-height: 50px;
        }
      }

      .btn {
        text-align: center;
      }
    }
  }
</style>
