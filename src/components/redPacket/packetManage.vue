<template>
  <div id="packetManage" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title" @click="toComponent('sendPacket')">红包管理</div>
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
              <div class="col-xs-4">
                <div class="row-label">红包编号</div>
              </div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入编号">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">用户名</div>
              </div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">红包状态</div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="toReceive">
                  <label for="toReceive">领取中</label>
                  <input type="radio" name="packetStatus" id="toReceive">
                  <div class="user-defined active">
                    <span class="circle active"></span>
                  </div>
                </div>
                <div class="hasFailure">
                  <label for="hasFailure">已失效</label>
                  <input type="radio" name="packetStatus" id="hasFailure">
                  <div class="user-defined">
                    <span class="circle"></span>
                  </div>
                </div>
                <div class="all">
                  <label for="all">全部</label>
                  <input type="radio" name="packetStatus" id="all">
                  <div class="user-defined">
                    <span class="circle"></span>
                  </div>
                </div>
                <!--<div class="fruit">-->
                  <!--<div class="apple">-->
                    <!--<label for="apple">苹果</label>-->
                    <!--<input type="radio" name="fruit" id="apple">-->
                    <!--<div class="user-defined">-->
                      <!--<span class="circle"></span>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="banana">-->
                    <!--<label for="banana">香蕉</label>-->
                    <!--<input type="radio" name="fruit" id="banana">-->
                    <!--<div class="user-defined">-->
                      <!--<span class="circle"></span>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="orange">-->
                    <!--<label for="orange">橘子</label>-->
                    <!--<input type="radio" name="fruit" id="orange">-->
                    <!--<div class="user-defined">-->
                      <!--<span class="circle"></span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              </div>
            </div>
            <div class="popover-row">
              <div class="title">领取时间</div>
              <div class="row-content clearfix">
                <div class="time-btn">
                  <yd-datetime v-model="start_date" :yearFormat="yearFormat" :month-format="monthFormat"
                               :day-format="dayFormat" type="date" slot="right"></yd-datetime>
                </div>
                <div class="time-line"></div>
                <div class="time-btn">
                  <yd-datetime v-model="end_date" :yearFormat="yearFormat" :month-format="monthFormat"
                               :day-format="dayFormat" type="date" slot="right"></yd-datetime>
                </div>
              </div>
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
    name: "packet-manage",
    data() {
      return {
        isShowPopover: false,
        start_date: '2010-01-01',
        end_date: '2010-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
      }
    },
    methods: {
      enter_detail(id) {
        // this.$router.push({path: '/queryCapital/capitalDetail', query: {'capitalDetailId': id, 'capitalType': type}});
        setLocalStorage('packetManageDetailId', id);
        this.$root.Bus.$emit('toggleComponent', 'packetManageDetail')
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

<style scoped lang="less">
  #packetManage {

    .query-popover {
      .popover-row {
        padding-left: 5px;
        .title {
          font-weight: normal;
        }
      }

      .toReceive, .hasFailure, .all {
        position: relative;
        height: 20px;
        line-height: 20px;
        margin-left: 24px;
        display: inline-block;
        label {
          display: block;
          height: 20px;
          width: 55px;
          line-height: 20px;
          cursor: pointer;
        }
        input {
          z-index: 3;
          display: block;
          opacity: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          left: -24px;
          margin: auto;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .user-defined {
          z-index: 2;
          position: absolute;
          top: 0;
          bottom: 0;
          left: -24px;
          margin: auto;
          width: 24px;
          height: 24px;
          border: 1px solid #BEBEBE;
          border-radius: 50%;
          cursor: pointer;

          span.circle {
            display: block;
            width: 16px;
            height: 16px;
            margin-top: 3px;
            margin-left: 3px;
            background-color: transparent;
            border-radius: 50%;
          }

          &.active {
            border-color: #FF7F00;
            span {
              background-color: #FF7F00;
            }
          }
        }
      }
      .all {
        label {
          width: 40px;
        }
      }
    }
  }
</style>
