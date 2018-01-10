<template>
  <div id="my-content">
    <div class="assets">
      <div class="assets-title">总资产 <span>(元)</span>
        <span class="close-ico" v-bind:class="{'open-ico':isShowAssets==1}"
              @click="toggle"></span>
        <!--<span v-bind:class="{'open-ico':isShowAssets==1,'close-ico':!isShowAssets}"-->
        <!--@click="toggle"></span>-->
        <!--<span class="open-ico" @click="toggle" v-if="isShowAssets==1"></span>-->
        <!--<span class="close-ico" @click="toggle" v-else></span>-->
      </div>
      <div class="assets-num" v-if="isShowAssets==1"><span class="amount">16734.5</span>元</div>
      <div class="assets-num" v-else>******</div>
      <div class="recharge-btn">充值</div>
    </div>
    <div class="my-detail">
      <div class="detail-line">
        <div class="item">
          <img src="/static/img/Edition.png" alt="资产明细">
          <div class="item-info">
            <div class="title">资金明细</div>
            <div class="des">我的充值记录明细</div>
          </div>
        </div>
        <div class="item last-item">
          <router-link to="/loginRecord">
            <img src="/static/img/IP.png" alt="登陆记录">
            <div class="item-info">
              <div class="title">登陆记录</div>
              <div class="des">{{login_ip}}</div>
            </div>
          </router-link>
        </div>
        <div class="line"></div>
      </div>
      <div class="detail-line">
        <div class="item">
          <img src="/static/img/share.png" alt="分享游戏大厅">
          <div class="item-info">
            <div class="title">分享游戏大厅</div>
            <div class="des">可获0.05分收益</div>
          </div>
        </div>
        <div class="item last-item">
          <img src="/static/img/Record.png" alt="当前版本">
          <div class="item-info">
            <div class="title">当前版本</div>
            <div class="des">2.3.1</div>
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
  import {setLocalStornage, getLocalStornage} from "../../../static/js/util";

  export default {
    name: "my-content",
    props: ['login_ip'],
    created() {
      this.getState();
    },
    data: function () {
      return {
        isShowAssets: 0,
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }
    },
    methods: {
      getState: function () {
        this.isShowAssets = getLocalStornage("showAssets");
      },
      toggle: function () {
        var showstate = getLocalStornage("showAssets");
        if (showstate != 1) {
          this.isShowAssets = 1;
          setLocalStornage("showAssets", this.isShowAssets);
        } else {
          this.isShowAssets = 0;
          setLocalStornage("showAssets", this.isShowAssets);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .assets {
    width: 100%;
    height: 75px;
    background: #fff;
    border-radius: 10px;
    padding: 12px 15px;
    position: relative;
    box-shadow: 0 0 3px 3px #F0F8FF;
    margin-bottom: 15px;
    .assets-title {
      font-size: 14px;
      margin-bottom: 15px;
      span {
        margin-left: 5px;
      }
      .close-ico {
        display: inline-block;
        width: 17px;
        height: 12px;
        background-image: url('/static/img/ico_ice_up_2.png');
        background-size: cover;
      }
      .close-ico.open-ico {
        background-image: url('/static/img/ico_ice_down_2.png');
        background-size: cover;
      }
    }

    .assets-num {
      font-size: 20px;
      color: #FF991D;
    }

    .recharge-btn {
      width: 58px;
      height: 30px;
      line-height: 30px;
      background: #FF991D;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      position: absolute;
      top: 23px;
      right: 12px;
    }
  }

  .my-detail {
    width: 100%;
    height: 120px;
    background: #fff;
    border-radius: 10px;
    padding: 16px 13px;
    margin-bottom: 18px;

    .detail-line {
      width: 100%;
      height: 47px;
      margin-bottom: 11px;
      border-bottom: 1px solid #EBEBEB;
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      .item {
        width: 50%;
        float: left;
        a {
          color: #000;
        }
        img {
          width: 17px;
          height: 18px;
          float: left;
        }

        .item-info {
          float: left;
          margin-left: 14px;
          margin-top: 2px;

          .title {
            margin-bottom: 8px;
          }

          .des {
            color: #B9B9B9;
          }
        }
      }

      .last-item {
        padding-left: 20px;
      }

      .line {
        position: absolute;
        top: 2px;
        left: 50%;
        width: 1px;
        height: 30px;
        background: #EBEBEB;
      }

    }

  }

  .my-games {
    width: 100%;
    height: 170px;
    background: #fff;
    border-radius: 10px;
    padding: 17px 8px;

    .title {
      position: relative;
      img {
        width: 19px;
        height: 13px;
        position: absolute;
        top: 0;
        left: 0;
      }

      .my-play {
        margin-left: 30px;
        padding-bottom: 13px;
        font-size: 14px;
        border-bottom: 1px solid #EBEBEB;
      }
    }

    .online-games {
      padding-left: 30px;
      padding-top: 17px;
      .swiper-slide {
        text-align: center;
      }
      img {
        width: 64px;
        height: 64px;
      }
      .game-name {
        margin-top: 10px;
      }
    }
  }

</style>
