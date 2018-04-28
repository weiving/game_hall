<template>
  <div id="packetManageDetail" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('packetManage')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">红包管理详细</div>
    </div>
    <div class="page-content">
      <div class="record-detail">
        <div class="record-head">
          <label>红包编号</label>
          <span>4546545</span>
        </div>
        <div class="record-item">
          <label class="text-4">发送人</label>
          <div class="i-value">5659453</div>
        </div>
        <div class="record-item">
          <label class="text-4">接收对象</label>
          <div class="i-value payment">1.5</div>
        </div>
        <div class="record-item">
          <label class="text-4">红包金额</label>
          <div class="i-value">77777</div>
        </div>
        <div class="record-item">
          <label class="text-4">剩余金额</label>
          <div class="i-value">452.1</div>
        </div>
        <div class="record-item">
          <label class="text-4">开始时间</label>
          <div class="i-value">548255.2</div>
        </div>
        <div class="record-item">
          <label class="text-4">失效时间</label>
          <div class="i-value">+100.00</div>
        </div>
        <div class="record-item">
          <label class="text-4">红包状态</label>
          <div class="i-value">2018-02-21</div>
        </div>
        <div class="record-item">
          <label class="text-4">红包短语</label>
          <div class="i-value">2018-02-21</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "packet-manage-detail",
    created() {
      this.getPacketManageDetail();
    },
    data() {
      return {
        'packetManageDetailId': '',
      }
    },
    methods: {
      getPacketManageDetail() {
        this.packetManageDetailId = getLocalStorage('packetManageDetailId');
        console.log('packetManageDetailId', this.packetManageDetailId);
        var params = new URLSearchParams();
        params.append('packetManageDetailId', this.packetManageDetailId)
        this.$http
          .post(`/api/aa/bb`, params)
          .then(res => {
            if (res.data.success == 1) {

            } else {

            }
          })
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped>

</style>
