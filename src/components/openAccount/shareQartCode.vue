<template>
  <div id="shareQartCode" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('openAccount')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">分享二维码</div>
    </div>
    <div class="page-content">
      <div class="code-wrap">
        <vue-qr :text="qartCodeUrl" height="300" width="300" :size="qr_size"></vue-qr>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";
  import VueQr from 'vue-qr'

  export default {
    name: "share-qart-code",
    data() {
      return {
        qartCodeUrl: '',
        qr_size: 300
      }
    },
    created() {
      this.getQartCode();
    },
    methods: {
      getQartCode: function () {
        this.qartCodeUrl = getLocalStorage('qartCodeUrl')
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    components: {
      VueQr
    }
  }
</script>

<style scoped lang="less">
  /*分享二维码*/
  #shareQartCode {

    .page-content {
      background-color: #141414;
      .code-wrap {
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }

  }

</style>
