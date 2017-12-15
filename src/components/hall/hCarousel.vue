<template>
  <div id="carousel">
    <swipe class="my-swipe">
      <swipe-item class="slide1">
        <img src="../../resource/img/ad01.png" alt="">
      </swipe-item>
      <swipe-item class="slide2">
        <img src="../../resource/img/ad02.png" alt="">
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'vue-swipe'

  export default {
    name: "h-carousel",
    components: {
      swipe: Swipe,
      swipeItem: SwipeItem
    }
  }
</script>

<style scoped>
  .my-swipe {
    height: 200px;
    width: 100vw;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }

  .slide1 img, .slide2 img {
    width: 100vw;
  }


</style>
