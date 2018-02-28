<template>
  <div id="shareBonus" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">下级分红</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <div class="tabs-content">
        <div class="recordType">
          <div class="record-list" style="margin-top: 10px">
            <div class="row">
              <div class="row-title">申请时间 <span class="number">2018-2-5</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">微信</div>
                  <div class="col-name">付款方式</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">不通过</div>
                  <div class="col-name">状态</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">申请时间 <span class="number">2018-2-5</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">微信</div>
                  <div class="col-name">付款方式</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">不通过</div>
                  <div class="col-name">状态</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">申请时间 <span class="number">2018-2-5</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">微信</div>
                  <div class="col-name">付款方式</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">不通过</div>
                  <div class="col-name">状态</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">申请时间 <span class="number">2018-2-5</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">充值后余额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">微信</div>
                  <div class="col-name">付款方式</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-green">审核通过</div>
                  <div class="col-name">状态</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">申请时间 <span class="number">2018-2-5</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">微信</div>
                  <div class="col-name">付款方式</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">不通过</div>
                  <div class="col-name">状态</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slideDown">
      <div class="query-popover" v-show="isShowPopover">
        <div class="popover-body">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户名</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">选择游戏</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">状态</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">分红期数</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>

          </div>
        </div>
        <div class="popover-footer">
          <div class="opt-btn">重置</div>
          <div class="opt-btn sure-btn">确定</div>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="isShowPopover" @click="togglePopover"></div>
  </div>
</template>

<script>
  import {setLocalStorage} from "../../../static/js/util";

  export default {
    name: "share-bonus",
    data() {
      return {
        isShowPopover: false
      }
    },
    methods: {
      enter_detail(id) {
        // this.$router.push({path: '/queryCapital/capitalDetail', query: {'capitalDetailId': id, 'capitalType': type}});
        setLocalStorage('shareBonusDetailId', id);
        this.$root.Bus.$emit('toggleComponent', 'shareBonusDetail')
      },
      toggleType(type) {
        this.defaultType = type;
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
  }
</script>

<style scoped>

</style>
