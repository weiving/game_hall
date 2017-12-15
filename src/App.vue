<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import '../static/css/reset.css';
  html, body,#app {
    height: 100%;
    overflow: hidden;
  }
</style>
