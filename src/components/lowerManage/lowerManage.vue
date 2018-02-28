<template>
  <div id="lowerManage" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">下级管理</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-3" v-for="(item,index) in lowerType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{lowerName[index]}}</a>
        </li>
      </ul>
      <div class="tabs-content">
        <div class="recordType" v-if="defaultType=='lowerManage'">
          <div class="record-list">
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
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
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
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
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
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
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
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
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
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recordType" v-if="defaultType=='blendRecord'">
          <div class="record-list">
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recordType" v-if="defaultType=='lowerRecharge'">
          <div class="record-list">
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-green">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(2,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(3,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-green">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(2,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(3,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-green">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(2,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">总游戏量2 <span class="number">2</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(3,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recordType" v-if="defaultType=='lowerWithdrawals'">
          <div class="record-list">
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="row-title">出款金额 <span class="number">27笔数</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">15617.65</div>
                  <div class="col-name">活动金额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">0.8</div>
                  <div class="col-name">返点</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">-963.65</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(1,defaultType)">
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
            <div class="row row-head">
              <div class="title">选择类型</div>
              <div class="row-content">
                <div class="row-btn" v-for="(item,index) in lowerType" :class="{'active':defaultType==item}">
                  {{lowerName[index]}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户名</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">余额范围</div></div>
              <div class="col-xs-8 row-inline">
                <input type="text" class="input-lower">
                <span></span>
                <input type="text" class="input-high">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">返点范围</div></div>
              <div class="col-xs-8 row-inline">
                <input type="text" class="input-lower">
                <span></span>
                <input type="text" class="input-high">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户类型</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">在线状态</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">下级所属</div></div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">排序</div></div>
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
    name: "lower-manage",
    data() {
      return {
        lowerName: ['下级管理', '调点记录', '下级充值', '下级取款'],
        lowerType: ['lowerManage', 'blendRecord', 'lowerRecharge', 'lowerWithdrawals'],
        defaultType: 'lowerManage',
        isShowPopover: false
      }
    },
    methods: {
      enter_detail(id, type) {
        setLocalStorage('lowerDetailId',id);
        setLocalStorage('lowerType',type);
        this.$root.Bus.$emit('toggleComponent', 'lowerDetail')
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
