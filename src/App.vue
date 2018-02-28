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
    components: {
      iFooter: iFooter
    },
  }
</script>

<style>

</style>
