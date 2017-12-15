<template>
  <div id="hall-index">
    <hCarousel></hCarousel>
    <hNav></hNav>
    <hContent></hContent>
    <hFooter></hFooter>
  </div>
</template>

<script>
  import hCarousel from '@/components/hall/hCarousel'
  import hNav from '@/components/hall/hNav'
  import hContent from '@/components/hall/hContent'
  import hFooter from '@/components/hall/hFooter'

  export default {
    name: "hall",
    components: {
      'hCarousel': hCarousel,
      'hNav': hNav,
      'hContent': hContent,
      'hFooter': hFooter
    }
  }
</script>

<style scoped>
  #hall-index {
    height: 100%;
    background-color: #F7FBFF;
  }
</style>
