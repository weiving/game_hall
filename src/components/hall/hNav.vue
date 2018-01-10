<template>
  <div id="navbar">
    <div class="navbar-wrap">
      <div class="game-item">
        <i class="icon game-icon"></i>
        <span class="nav-title">游戏礼包</span>
      </div>
      <div class="ranking-item">
        <i class="icon ranking-icon"></i>
        <span class="nav-title">人气排行</span>
      </div>
      <div class="online-item">
        <i class="icon online-icon"></i>
        <span class="nav-title">在线：{{onlineNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "h-nav",
    props: ['onlineNum']
  }
</script>

<style scoped>
  #navbar {
    width: 100%;
    position: relative;
  }

  .navbar-wrap {
    width: 94%;
    height: 50px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 2px 2px #F4F9FE;
    text-align: center;
    position: absolute;
    top: -40px;
    left: 3%;
    z-index: 100;
    font-size: 14px;
  }

  .navbar-wrap .game-item {
    display: inline-block;
    width: 30%;
    position: relative;
    border-right: 1px solid #eeeeee;
    margin-top: 17px;
    margin-bottom: 17px;
  }

  .navbar-wrap .game-item .game-icon {
    display: inline-block;
    width: 19px;
    height: 13px;
    background-image: url("/static/img/Package.png");
    background-size: cover;
  }

  .navbar-wrap .ranking-item {
    display: inline-block;
    width: 30%;
    position: relative;
    border-right: 1px solid #eeeeee;
    margin-top: 17px;
    margin-bottom: 17px;
  }

  .navbar-wrap .ranking-item .ranking-icon {
    display: inline-block;
    width: 19px;
    height: 13px;
    background-image: url("/static/img/Popularity.png");
    background-size: cover;
  }

  .navbar-wrap .online-item {
    display: inline-block;
    width: 36%;
    position: relative;
    margin-top: 17px;
    margin-bottom: 17px;
  }

  .navbar-wrap .online-item .online-icon {
    display: inline-block;
    width: 19px;
    height: 13px;
    background-image: url("/static/img/line.png");
    background-size: cover;
  }

</style>
