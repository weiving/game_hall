<template>
  <div id="withdrawal" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">提现</div>
    </div>
    <div class="page-content">
      提现提现提现提现提现提现提现
    </div>
  </div>
</template>

<script>
  export default {
    name: "withdrawal",
    methods:{
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped>

</style>
