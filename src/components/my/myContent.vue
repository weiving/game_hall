<template>
  <div id="my-content">
    <div class="assets">
      <div class="assets-title">总资产 <span>(元)</span>
        <span class="close-ico" v-bind:class="{'open-ico':isShowAssets==1}"
              @click="toggle"></span>
      </div>
      <div class="assets-num" v-if="isShowAssets==1"><span class="amount">{{amount}}</span>元</div>
      <div class="assets-num" v-else>******</div>
      <div class="withdrawal-btn" @click="toComponent('withdraw')">提现</div>
      <div class="recharge-btn" @click="toComponent('recharge')">充值</div>
    </div>
    <div class="my-detail">
      <div class="detail-line">
        <div class="item">
          <div @click="toComponent('reportRecord')">
            <img src="/static/img/Edition.png" alt="报表查询">
            <div class="item-info">
              <div class="title">报表查询</div>
              <div class="des">分为游戏报表</div>
            </div>
          </div>
        </div>
        <div class="item last-item">
          <div @click="toComponent('record')">
            <img src="/static/img/IP.png" alt="记录查询">
            <div class="item-info">
              <div class="title">记录查询</div>
              <div class="des">分为游戏记录</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="detail-line">
        <div class="item">
          <div @click="toComponent('capitalRecord')">
            <img src="/static/img/Record.png" alt="充提转记录">
            <div class="item-info">
              <div class="title">充提转记录</div>
              <div class="des">分为充提转记录</div>
            </div>
          </div>
        </div>
        <!--<div class="item last-item">-->
        <!--<img src="/static/img/share.png" alt="分享游戏大厅">-->
        <!--<div class="item-info">-->
        <!--<div class="title">分享游戏大厅</div>-->
        <!--<div class="des">可获0.05分收益</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="line"></div>
      </div>
    </div>

    <div class="agent-manege" v-if="user_type==2">
      <div class="detail-line">
        <div class="item" @click="toComponent('teamStatistics')">
          <img src="/static/img/Statistics.png" alt="团队统计">
          <div class="item-info">
            <div class="title">团队统计</div>
            <div class="des">查看最新的数据</div>
          </div>
        </div>
        <div class="item last-item" @click="toComponent('lowerManage')">
          <img src="/static/img/Management.png" alt="下级管理">
          <div class="item-info">
            <div class="title">下级管理</div>
            <div class="des">分为下级管理</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="detail-line">
        <div class="item" @click="toComponent('openAccount')">
          <img src="/static/img/accounts.png" alt="开户中心">
          <div class="item-info">
            <div class="title">开户中心</div>
            <div class="des">分为添加下级</div>
          </div>
        </div>
        <div class="item last-item" @click="toComponent('packetManage')">
          <img src="/static/img/Bag.png" alt="红包管理">
          <div class="item-info">
            <div class="title">红包管理</div>
            <div class="des">给下级发送红包</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="detail-line">
        <div class="item" @click="toComponent('shareBonus')">
          <img src="/static/img/Record.png" alt="下级分红">
          <div class="item-info">
            <div class="title">下级分红</div>
            <div class="des">通过条件查询</div>
          </div>
        </div>
        <div class="item last-item" @click="toComponent('dailyWages')">
          <img src="/static/img/Wages.png" alt="下级日工资">
          <div class="item-info">
            <div class="title">下级日工资</div>
            <div class="des">通过条件查询</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>

    <div class="my-games">
      <div class="title">
        <img src="/static/img/line.png" alt="">
        <div class="my-play">我在撸的游戏</div>
      </div>
      <div class="online-games">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/static/img/ico03.png" alt="皇家赢三张">
            <div class="game-name">皇家赢三张</div>
          </swiper-slide>
          <swiper-slide>
            <img src="/static/img/ico05.png" alt="输三张">
            <div class="game-name">输三张</div>
          </swiper-slide>
          <swiper-slide>
            <img src="/static/img/ico08.png" alt="跑得快">
            <div class="game-name">跑得快</div>
          </swiper-slide>
          <swiper-slide>
            <img src="/static/img/ico09.png" alt="疯狂炸翻天">
            <div class="game-name">疯狂炸翻天</div>
          </swiper-slide>
          <swiper-slide>
            <img src="/static/img/ico09.png" alt="323">
            <div class="game-name">432143</div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";

  export default {
    name: "my-content",
    props: ['user_type'],
    created() {
      this.getAssets();
      this.getState();
    },
    data: function () {
      return {
        amount: '',
        isShowAssets: 0,
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }
    },
    methods: {
      getState: function () {
        this.isShowAssets = getLocalStorage("showAssets");
      },
      getAssets: function () {
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        var session = getLocalStorage("session");
        this.$http
          .post(`${this.$api}/v1/wallet/r/get_user_balance/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.amount = resData.data.balance;
            } else {

            }
          })
      },
      toggle: function () {
        var showstate = getLocalStorage("showAssets");
        if (showstate != 1) {
          this.isShowAssets = 1;
          setLocalStorage("showAssets", this.isShowAssets);
        } else {
          this.isShowAssets = 0;
          setLocalStorage("showAssets", this.isShowAssets);
        }
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component);
        if (component == 'recharge') {
          this.$root.Bus.$emit('footerStatus', 'recharge')
        }
      },
    }
  }
</script>

<style scoped lang="less">


</style>
