<template>
  <div id="app">
    <router-view/>
    <iFooter></iFooter>
  </div>
</template>

<script>
  import iFooter from '@/components/footer/iFooter'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      iFooter: iFooter
    },
    methods: {}
  }
</script>

<style lang="less">

</style>
