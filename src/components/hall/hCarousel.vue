<template>
  <swiper :options="swiperOption" style="height: 200px">
    <swiper-slide v-for="(item,index) in slideList" :key="index">
      <img :src="item.img_src" :alt="item.title">
    </swiper-slide>
    <!--<swiper-slide>-->
    <!--<img src="/static/img/ad01.png" alt="">-->
    <!--</swiper-slide>-->
    <!--<swiper-slide>-->
    <!--<img src="/static/img/ad02.png" alt="">-->
    <!--</swiper-slide>-->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    created() {
      this.get_conf();
    },
    data() {
      return {
        swiperOption: {
          autoHeight: true, //enable auto height
          spaceBetween: 20,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          slideList: ""
        }
      }
    },
    methods: {
      get_conf() {
        this.slideList = this.$confJson.index.banner.list;
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style>
  .swiper-container .swiper-slide img {
    width: 100% !important;
  }

</style>
