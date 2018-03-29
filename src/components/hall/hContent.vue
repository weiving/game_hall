<template>
  <div id="content">
    <div class="hall-content">
      <!--<div class="hall-header">-->
      <!--<img src="/static/img/ico01.png" alt="斗地主">-->
      <!--<div class="header-game-info">-->
      <!--<div class="game-title">斗地主</div>-->
      <!--<div class="game-online"><span class="text-orange">8.3万人</span>在玩</div>-->
      <!--<div class="game-des">对局赢话费，欢乐斗不停！</div>-->
      <!--</div>-->
      <!--<div class="jump-btn">-->
      <!--<button type="button" class="play-game">玩玩看</button>-->
      <!--</div>-->
      <!--</div>-->
      <div class="hall-header">
        <img :src="itemHead.img_src" :alt="itemHead.title">
        <div class="header-game-info">
          <div class="game-title">{{itemHead.title}}</div>
          <div class="game-online"><span class="text-orange">{{itemHead.online}}万人</span>在玩</div>
          <div class="game-des">对局赢话费，欢乐斗不停！</div>
        </div>
        <div class="jump-btn">
          <button type="button" class="play-game">玩玩看</button>
        </div>
      </div>
      <div class="hall-body" :style="{height:h_val+'px'}">
        <div class="item-game" v-for="(item,index) in itemList" :key="index">
          <!--<a href="http://192.168.0.25/football/">-->
          <!--<img :src="item.img_src" :alt="item.title">-->
          <!--</a>-->
          <a href="javaScripts:(0)" @click="toComponent('gameFrame')">
            <img :src="item.img_src" :alt="item.title">
          </a>
          <div class="play-online"><span class="text-orange">{{item.online}}万人</span>在玩</div>
          <div class="title">{{item.title}}</div>
        </div>

        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico02.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">3.6万人</span>在玩</div>-->
        <!--<div class="title">欢乐麻将</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico03.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">3.2万人</span>在玩</div>-->
        <!--<div class="title">皇家赢三张</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico04.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">1.1万人</span>在玩</div>-->
        <!--<div class="title">战机1942</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico05.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">2.2万人</span>在玩</div>-->
        <!--<div class="title">输三张</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico06.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">0.7万人</span>在玩</div>-->
        <!--<div class="title">美女捕鱼</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico07.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">4.8万人</span>在玩</div>-->
        <!--<div class="title">比鸡</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico08.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">3.6万人</span>在玩</div>-->
        <!--<div class="title">跑得快</div>-->
        <!--</div>-->
        <!--<div class="item-game">-->
        <!--<img src="/static/img/ico09.png" alt="">-->
        <!--<div class="play-online"><span class="text-orange">1.6万人</span>在玩</div>-->
        <!--<div class="title">疯狂炸翻天</div>-->
        <!--</div>-->
      </div>
      <div class="hall-footer">
        <a href="#" class="" @click="get_more">{{text}}</a>
      </div>
    </div>
    <div class="sub-content">
      <!--<div class="progress">-->
      <!--<div class="circle"></div>-->
      <!--<div class="line"></div>-->
      <!--<div class="circle"></div>-->
      <!--&lt;!&ndash;<div class="line"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="circle"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="line"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="circle"></div>&ndash;&gt;-->
      <!--</div>-->
      <div class="record-items">
        <swiper :options="swiperOption">
          <swiper-slide class="item" v-for="(item,index) in scrollNoticeList" :key="index">
            <div class="item-title">{{item.title}}</div>
            <div class="item-content">
              <p class="text">{{item.content}}</p>
            </div>
            <div class="item-time">{{item.expired_at}}</div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "h-content",
    created() {
      this.get_conf();
    },
    data: function () {
      return {
        itemHead: '',
        itemList: "",
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 2,
          // slidesPerGroup:2,
          spaceBetween: 0,
          mousewheel: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          // loop: true,
        },
        click_times: 0,
        h_val: 240,
        text: "点击查看全部",
        scrollNoticeList: ''
      }
    },
    methods: {
      get_conf() {
        this.itemHead = this.$confJson.index.lobby.landlords;
        this.itemList = this.$confJson.index.lobby.chess.slice(0, 8);
        // console.log(this.itemHead)
        // console.log(this.itemList)
        var user_id = getLocalStorage('user_id');
        var user_name = getLocalStorage('user_name');
        var session = getLocalStorage('session');

        var params = new URLSearchParams();
        params.append('device', 1);

        if (user_id == undefined || user_id == '') {
          this.$http
            .post(`${this.$api}/v1/notice/r/get_scroll_notice/1/1?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              this.scrollNoticeList = resData.data;
            })
        } else {
          this.$http
            .post(`${this.$api}/v1/notice/r/get_login_scroll_notice/${user_id}/${user_name}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              this.scrollNoticeList = resData.data;
            })
        }


      },

      get_more() {
        var length = this.$confJson.index.lobby.chess.length;
        if (length > 8 + this.click_times * 4) {
          this.click_times++;
          var n = 8 + this.click_times * 4;
          this.itemList = this.$confJson.index.lobby.chess.slice(0, n);
          this.h_val = 240 + 120 * this.click_times;
        } else {
          this.text = "已经到底部了~"
        }

      },

      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">
  .text-orange {
    margin-right: 5px;
  }

  #content {
    margin-top: 25px;
    .hall-content {
      width: 94%;
      margin-left: 3%;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 1px 5px #F4F9FE;
      padding: 10px 10px 0 10px;

      .hall-header {
        height: 80px;
        border-bottom: 1px solid #F5F5F5;
        position: relative;

        img {
          width: 65px;
          height: 65px;
          float: left;
        }

        .header-game-info {
          height: 65px;
          margin-left: 15px;
          float: left;
          font-size: 14px;
          font-weight: bold;

          .game-title {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .game-online {
            margin-bottom: 10px;
            color: #B2B2B2;
          }

          .game-des {
            color: #B2B2B2;
          }
        }

        .jump-btn {
          position: absolute;
          top: 10px;
          right: 5px;
          .play-game {
            height: 40px;
            line-height: 40px;
            background-color: #fff;
            border: 1px solid #278CF5;
            color: #278CF5;
            border-radius: 4px;
            font-size: 16px;
            padding: 1px 6px;
          }
        }

      }

      .hall-body {
        width: 100%;
        height: 240px;
        border-bottom: 1px solid #F5F5F5;

        .item-game {
          width: 22%;
          height: 110px;
          margin-top: 10px;
          margin-right: 4%;
          float: left;
          text-align: center;

          &:nth-child(4n) {
            margin-right: 0;
          }

          img {
            width: 65px;
            height: 65px;
            background-size: cover;
          }

          .play-online {
            margin-top: 5px;
            font-size: 10px;
            color: rgb(178, 178, 178);
          }

          .title {
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

      }

      .hall-footer {
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
    }

    .sub-content {
      width: 94%;
      margin-top: 15px;
      margin-bottom: 55px;
      margin-left: 3%;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 1px 5px #F4F9FE;
      padding: 15px 10px;
      display: flex;
      font-size: 10px;

      .progress {
        display: inline-block;
        width: 18px;
        height: 105px;
        .circle {
          width: 8px;
          height: 8px;
          background: #278CF5;
          border-radius: 50%;
          margin-top: 3px;
          margin-bottom: 5px;
          &:first-child {
            margin-top: 8px;
          }
        }

        .line {
          width: 2px;
          height: 10px;
          background: #278CF5;
          margin-left: 3px;
        }
      }

      .record-items {
        flex: 1;
        width: 100%;
        .swiper-container {
          height: 160px;
          width: 100%;
        }

        .item {
          position: relative;
          padding-left: 20px;
          .item-title {
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #278CF5;
            position: relative;
            &:before {
              content: '';
              width: 10px;
              height: 10px;
              display: block;
              background: #278CF5;
              border-radius: 50%;
              position: absolute;
              top: 10px;
              left: -20px;
            }
          }
          .item-content {
            width: 100%;
            min-height: 20px;
            max-height: 40px;
            line-height: 20px;
            position: relative;
            .text {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            &:after {
              content: '';
              width: 2px;
              height: 100%;
              display: block;
              background: #278CF5;
              position: absolute;
              top: 0px;
              left: -16px;
            }
          }
          .item-time {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #b2b2b2;
          }
        }

      }

    }

  }


</style>
