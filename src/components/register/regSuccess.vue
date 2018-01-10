<template>
  <div id="regSuccess">
    <span class="tip"> 注册成功！请
    </span>
    <router-link to="/login">登录</router-link>
  </div>
</template>

<script>
  export default {
    name: "reg-success"
  }
</script>

<style scoped>
  #regSuccess {
    width: 100%;
    height: 100%;
    background-image: url('/static/img/bg.png');
    background-size: cover;
    padding: 20px;
  }

  #regSuccess .tip {
    font-size: 20px;
    color: #42b983;
    font-weight: bold;
  }
  #regSuccess a {
    font-size: 20px;
    color: #fff;
  }
</style>
