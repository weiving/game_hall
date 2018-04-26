<template>
  <div id="ranking" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('hall')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">人气排行</div>
    </div>
    <div class="page-content">
      <div class="sub-nav">
        <div class="nav-li" v-for="(item,index) in tabs" @click="toggle(index)" :class="{active:index==num}">{{item}}
        </div>
      </div>

      <div class="rank-list" v-show="num==0">
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/one.png" alt="1">
          </div>
          <img src="/static/img/ico02.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/two.png" alt="2">
          </div>
          <img src="/static/img/ico03.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/third.png" alt="3">
          </div>
          <img src="/static/img/ico04.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">4</div>
          <img src="/static/img/ico05.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">5</div>
          <img src="/static/img/ico06.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
      </div>
      <div class="rank-list" v-show="num==1">
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/one.png" alt="1">
          </div>
          <img src="/static/img/ico02.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将11</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/two.png" alt="2">
          </div>
          <img src="/static/img/ico03.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/third.png" alt="3">
          </div>
          <img src="/static/img/ico04.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">4</div>
          <img src="/static/img/ico05.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">5</div>
          <img src="/static/img/ico06.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
      </div>
      <div class="rank-list" v-show="num==2">
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/one.png" alt="1">
          </div>
          <img src="/static/img/ico02.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将22</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/two.png" alt="2">
          </div>
          <img src="/static/img/ico03.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">
            <img src="/static/img/third.png" alt="3">
          </div>
          <img src="/static/img/ico04.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">4</div>
          <img src="/static/img/ico05.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
        <div class="rank-item">
          <div class="num">5</div>
          <img src="/static/img/ico06.png" alt="" class="item-icon">
          <div class="item-title">
            <div class="name">欢乐麻将</div>
            <div class="online"><span class="text-orange">2.2万人</span>在玩</div>
          </div>
          <div class="play-btn">
            玩玩看
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ranking",
    data() {
      return {
        tabs: ["热游榜", "新游榜", "富豪榜"],
        num: 0
      }
    },
    methods: {
      toggle(index) {
        this.num = index;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">
  #ranking {
    .page-content {
      .sub-nav {
        width: 100vw;
        height: 57px;
        padding: 0 50px;
        font-size: 16px;
        color: #5D97F9;
        text-align: center;

        .nav-li {
          display: inline-block;
          width: 60px;
          height: 57px;
          line-height: 57px;
          text-align: center;
          margin: 0 15px;
          &.active {
            color: #FF7F00;
            border-bottom: 2px solid #FF7F00;
          }
        }
      }

      .rank-list {
        flex: 1;
        margin: 0 9px;
        background: #ffffff;
        border-radius: 6px;

        .rank-item {
          height: 80px;
          margin: 20px 4px 9px 30px;
          border-bottom: 1px solid #EBEBEB;
          position: relative;
          font-size: 14px;
          .num {
            position: absolute;
            top: 20px;
            left: -25px;
            width: 19px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            font-size: 16px;
            color: #666666;
            img {
              width: 19px;
              height: 24px;
            }
          }

          .item-icon {
            width: 60px;
            height: 60px;
            margin-left: 7px;
            float: left;
          }

          .item-title {
            margin-top: 15px;
            margin-left: 12px;
            float: left;

            .online {
              margin-top: 6px;
              color: #888888;

              .text-orange {
                margin-right: 7px;
                color: #FF991D;
              }
            }
          }

          .play-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #5D97F9;
            border-radius: 4px;
            color: #5D97F9;
          }
        }
      }

    }
  }
</style>
