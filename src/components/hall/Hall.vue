<template>
  <div id="hall-index">
    <hCarousel></hCarousel>
    <hNav :onlineNum="onlineNum"></hNav>
    <hContent></hContent>
    <!--<iFooter v-bind:isHome="true"></iFooter>-->
  </div>
</template>

<script>
  import hCarousel from '@/components/hall/hCarousel'
  import hNav from '@/components/hall/hNav'
  import hContent from '@/components/hall/hContent'
  // import iFooter from '@/components/footer/iFooter'

  export default {
    name: "hall",
    created() {
      this.getOnlineNum();
    },
    data() {
      return {
        slideList: '',
        onlineNum: 0
      }
    },
    methods: {
      getOnlineNum: function () {
        this.$http
          .post(`${this.$api}/pubsub/online`)
          .then(res => {
            if (res.data.success == 1) {
              this.onlineNum = res.data.concurrent;
            } else {
              console.log('concurrent.message', res.data.message)
            }
          })
          .catch(err => {
            console.log('concurrent.err.message', err.message)
          })
      }
    },
    components: {
      'hCarousel': hCarousel,
      'hNav': hNav,
      'hContent': hContent,
      // 'iFooter': iFooter
    }
  }
</script>

<style scoped>
  #hall-index {
    height: 100%;
    background-color: #F7FBFF;
    overflow: auto;
  }
</style>
