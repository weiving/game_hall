<template>
  <div>
    <span>{{msg}}</span>
    <button @click="fun">获取数据</button>
  </div>
</template>



<script>
  import Vue from 'vue';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "index",
    methods: {
      ...mapActions([ // 从store上绑定的action中载入需要的到此组件中
        'fun', // 我们稍后在src/store/actions.js中创建一个名为fun的方法
      ]),
    },
    computed: {
      ...mapGetters([ // 从store上绑定的getters中载入需要的到此组件中
        'msg' // 我们稍后在src/store/getters.js中创建一个名为msg的方法
      ]),
    }
  }
</script>

<style scoped>

</style>
