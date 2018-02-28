<template>
  <div id="footer">
    <div class="footer-wrap">
      <div class="f-item" v-for="(item,index) in footerStatus" :class="{active:defaultFooterStatus==item}">
        <div class="footer-item" @click="toComponent(item)">
          <i :class="item+'-icon'"></i>
          <div class="text">{{footerName[index]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "iFooter",
    created() {
      this.getFooterStatus();
    },
    data() {
      return {
        footerStatus: ['hall', 'recharge', 'msgCenter', 'my'],
        footerName: ['首页', '充值', '消息', '我的'],
        defaultFooterStatus: 'hall'
      }
    },
    methods: {
      getFooterStatus() {
        const _this = this;
        this.$root.Bus.$on('footerStatus', function (status) {
          _this.defaultFooterStatus = status;
        });
      },
      toComponent(component) {
        // const oIframe = document.getElementById('iframe');
        // oIframe.setAttribute('src', url);
        // this.$root.Bus.$emit('iframeSrc', url)
        this.$root.Bus.$emit('toggleComponent', component)
        this.defaultFooterStatus = component;
      }
    }
  }
</script>

<style scoped>

</style>
