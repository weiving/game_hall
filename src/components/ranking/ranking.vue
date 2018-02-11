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

<style scoped>


</style>
