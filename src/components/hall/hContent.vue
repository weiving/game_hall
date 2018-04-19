<template>
  <div id="hContent">
    <div class="hall-content">
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

      </div>
      <div class="hall-footer">
        <a href="#" class="" @click="get_more">{{text}}</a>
      </div>
    </div>
    <div class="sub-content">
      <swiper class="mySwiper">
        <swiper-slide class="item" v-for="(item,index) in scrollNoticeList" :key="index">
          <div class="item-title" v-html="item.title"></div>
          <div class="item-content">
            <p class="text" v-html="item.content"></p>
          </div>
          <div class="item-time" v-html="item.expired_at"></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "h-content",
    created() {
      this.get_conf();
    },
    data: function () {
      return {
        user_id: getLocalStorage('user_id'),
        user_name: getLocalStorage('user_name'),
        session: getLocalStorage('session'),
        itemHead: '',
        itemList: "",
        click_times: 0,
        h_val: 240,
        text: "点击查看全部",
        scrollNoticeList: [],
      }
    },
    methods: {
      initSwiper() {
        let that = this;
        that.mySwiper = null;
        that.mySwiper = new Swiper('.mySwiper', {
          direction: 'vertical',
          slidesPerView: 2,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
        })
      },
      get_conf() {
        this.itemHead = this.$confJson.index.lobby.landlords;
        this.itemList = this.$confJson.index.lobby.chess.slice(0, 8);


        var params = new URLSearchParams();
        params.append('device', 1);

        const that = this;
        if (this.user_id == undefined || this.user_id == '') {
          this.$http
            .post(`${this.$api}/v1/notice/r/get_scroll_notice/1/1?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              this.scrollNoticeList = resData.data;
              that.$nextTick(() => {
                that.initSwiper()
              })
            })
        } else {
          this.$http
            .post(`${this.$api}/v1/notice/r/get_login_scroll_notice/${this.user_id}/${this.user_name}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              this.scrollNoticeList = resData.data;
              that.$nextTick(() => {
                that.initSwiper()
              })
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
    },

  }
</script>

<style scoped>


</style>
