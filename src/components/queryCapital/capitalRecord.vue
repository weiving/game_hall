<template>
  <div id="capitalRecord" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">充提转记录</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-3" v-for="(item,index) in capitalType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{capitalName[index]}}</a>
        </li>
      </ul>
      <div class="tabs-content">
        <div class="recordType" v-if="defaultType=='recharge'">
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
        <div class="recordType" v-if="defaultType=='withdrawal'">
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
        <div class="recordType" v-if="defaultType=='transfer'">
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
        <div class="recordType" v-if="defaultType=='inOrOut'">
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
          <div class="popover-row">
            <div class="title">选择类型</div>
            <div class="row-content">
              <div class="row-btn" v-for="(item,index) in capitalType" :class="{'active':defaultType==item}">{{capitalName[index]}}</div>
            </div>
          </div>
          <div class="popover-row">
            <div class="title">选择游戏</div>
            <div class="row-content">
              <div class="row-btn">斗牛</div>
              <div class="row-btn active">斗地主</div>
              <div class="row-btn">德州扑克</div>
              <div class="row-btn">血战到底</div>
              <div class="row-btn">跑得快</div>
              <div class="row-btn">观点</div>
            </div>
          </div>
          <div class="popover-row">
            <div class="title">游戏时间</div>
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
    name: "capital-record",
    data() {
      return {
        capitalName: ["充值记录", "取款记录","转账记录","出入记录"],
        capitalType: ['recharge', 'withdrawal','transfer','inOrOut'],
        defaultType: 'recharge',
        isShowPopover: false,
        start_date: '2010-01-01',
        end_date: '2010-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
      }
    },
    methods: {
      enter_detail(id, type) {
        // this.$router.push({path: '/queryCapital/capitalDetail', query: {'capitalDetailId': id, 'capitalType': type}});
        setLocalStorage('capitalDetailId',id);
        setLocalStorage('capitalType',type);
        this.$root.Bus.$emit('toggleComponent', 'capitalDetail')
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
