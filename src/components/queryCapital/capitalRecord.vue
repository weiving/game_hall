<template>
  <div id="capitalRecord" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">充提转记录</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-nav">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-3" v-for="(item,index) in capitalType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{capitalName[index]}}</a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="tabs-content" v-if="defaultType=='recharge'">
        <div class="box-item" v-if="payOrderList==null||payOrderList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="payOrderList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in payOrderList">
            <div class="row-title">申请时间 <span class="number">{{item.created_at}}</span></div>
            <div class="row-content" @click="enter_detail(item.order_no,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.money}}</div>
                <div class="col-name">活动金额</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.pay_alias}}</div>
                <div class="col-name">付款方式</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{payStatusName[item.status-1]}}</div>
                <div class="col-name">订单状态</div>
              </div>
              <div class="col-xs-1">
                <div class="text-detail">
                  <i class="more-detail"></i>
                </div>
              </div>
            </div>
          </div>


        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='withdrawal'">
        <div class="box-item" v-if="drawOrderList==null || drawOrderList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="drawOrderList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in drawOrderList">
            <div class="row-title">申请时间<span class="number">{{item.created_at}}</span></div>
            <div class="row-content" @click="enter_detail(item.order_no,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.money}}</div>
                <div class="col-name">活动金额</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.bank_name}}</div>
                <div class="col-name">提现方式</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{drawStatusName[item.audit_status-1]}}</div>
                <div class="col-name">审核状态</div>
              </div>
              <div class="col-xs-1">
                <div class="text-detail">
                  <i class="more-detail"></i>
                </div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='transfer'">
        <div class="box-item" v-if="transferOrderList==null||transferOrderList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="transferOrderList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in transferOrderList">
            <div class="row-title">申请时间<span class="number">{{item.created_at}}</span></div>
            <div class="row-content" @click="enter_detail(1,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.money}}</div>
                <div class="col-name">活动金额</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.bank_name}}</div>
                <div class="col-name">提现方式</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{drawStatusName[item.audit_status-1]}}</div>
                <div class="col-name">审核状态</div>
              </div>
              <div class="col-xs-1">
                <div class="text-detail">
                  <i class="more-detail"></i>
                </div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='inOrOut'">
        <div class="box-item" v-if="inOrOutOrderList==null||inOrOutOrderList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="transferOrderList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in inOrOutOrderList">
            <div class="row-title">申请时间<span class="number">{{item.created_at}}</span></div>
            <div class="row-content" @click="enter_detail(1,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.money}}</div>
                <div class="col-name">活动金额</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.bank_name}}</div>
                <div class="col-name">提现方式</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{drawStatusName[item.audit_status-1]}}</div>
                <div class="col-name">审核状态</div>
              </div>
              <div class="col-xs-1">
                <div class="text-detail">
                  <i class="more-detail"></i>
                </div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
    </div>
    <transition name="slideDown">
      <div class="query-popover" v-show="isShowPopover">
        <div class="popover-body">
          <div class="popover-row">
            <div class="title">选择类型</div>
            <div class="row-content">
              <div class="row-btn-4" v-for="(item,index) in capitalType" :class="{'active':selectType==item}"
                   @click="selectCapitalType(item)">
                {{capitalName[index]}}
              </div>
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
          <div class="opt-btn" @click="reset">重置</div>
          <div class="opt-btn sure-btn" @click="filter">确定</div>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="isShowPopover" @click="togglePopover"></div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage, formatDate} from "../../../static/js/util";

  export default {
    name: "capital-record",
    data() {
      return {
        capitalName: ["充值记录", "取款记录", "转账记录", "出入记录"],
        capitalType: ['recharge', 'withdrawal', 'transfer', 'inOrOut'],
        defaultType: 'recharge',
        isShowPopover: false,
        start_date: '2018-01-01',
        end_date: '2018-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        payOrderList: [],
        drawOrderList: [],
        transferOrderList: [],
        inOrOutOrderList: [],

        currentPage: 1,
        pageSize: 5,

        payStatusName: ['待充值', '到账', '退回', '撤销', '过期未到账', '完成'],
        drawStatusName: ['未审核', '通过', '退回', '通过并打款'],
        selectType: 'recharge',
        isFilter: false,//判断是否筛选，用于重置时间
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            thresholds: 0,
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了'
            }
          }
        },

      }
    },
    mounted() {
      this.getDataList();
    },
    methods: {
      enter_detail(id, type) {
        // this.$router.push({path: '/queryCapital/capitalDetail', query: {'capitalDetailId': id, 'capitalType': type}});
        setLocalStorage('capitalDetailId', id);
        setLocalStorage('capitalType', type);
        this.$root.Bus.$emit('toggleComponent', 'capitalDetail')
      },
      toggleType(type) {
        this.defaultType = type;
        this.currentPage = 1;
        this.pageSize = 5;
        this.isFilter = false;
        this.payOrderList = [];
        this.drawOrderList = [];
        this.transferOrderList = [];
        this.inOrOutOrderList = [];
        this.getDataList();
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },

      getTime() {
        var date = {};
        if (this.isFilter) {
          date = {
            minDay: this.start_date + ' 00:00:00',
            maxDay: this.end_date + ' 23:59:59'
          }
        } else {
          var time = new Date();//当前时间
          var preDate = new Date(time.getTime() - 72 * 60 * 60 * 1000);//前一天
          var minDay = formatDate(preDate, 'yyyy-MM-dd hh:mm:ss');
          var maxDay = formatDate(time, 'yyyy-MM-dd hh:mm:ss');
          date = {
            minDay: minDay,
            maxDay: maxDay
          }
        }
        return date
      },

      getDataList() {
        var minDay = this.getTime('').minDay;
        var maxDay = this.getTime('').maxDay;

        var params = new URLSearchParams();
        params.append('created_at_min', minDay);
        params.append('created_at_max', maxDay);
        params.append('page_index',parseInt(this.currentPage));
        params.append('page_size', parseInt(this.pageSize));
        var url = '';
        if (this.defaultType == 'withdrawal') {
          url = `${this.$api}/v1/draw/r/find_draw_order_list/${this.user_id}/${this.username}?session=${this.session}`;
        } else if (this.defaultType == 'transfer') {

        } else if (this.defaultType == 'inOrOut') {

        } else {
          url = `${this.$api}/v1/pay/r/find_pay_order_list/${this.user_id}/${this.username}?session=${this.session}`;
          //该方法返回页码有误
        }
        if (url != '') {
          this.$http
            .post(url, params)
            .then(res => {
              var resData = res.data;
              this.response(resData);
            })
        }
      },

      response(resData) {
        if (resData.success == true) {
          const list = resData.data.list;
          if (list != undefined && list != null && list != '') {
            if (this.defaultType == 'withdrawal') {
              this.drawOrderList = this.drawOrderList.concat(list);
            } else if (this.defaultType == 'transfer') {
              this.transferOrderList = this.transferOrderList.concat(list);
            } else if (this.defaultType == 'inOrOut') {
              this.inOrOutOrderList = this.inOrOutOrderList.concat(list);
            } else {
              this.payOrderList = this.payOrderList.concat(list);
            }
            this.currentPage = parseInt(resData.data.page_index);
          } else {
            if (this.drawOrderList.length != 0 || this.transferOrderList.length != 0 || this.inOrOutOrderList.length != 0 || this.payOrderList.length != 0) {
              this.currentPage = this.currentPage - 1;
              this.$refs.scroll.forceUpdate()
            }
          }
        }
      },

      //选择类型
      selectCapitalType(type) {
        this.selectType = type;
      },
      //重置
      reset() {
        this.selectType = 'recharge';
        this.start_date = '2018-01-01';
        this.end_date = '2018-01-01';
      },

      //筛选
      filter() {
        this.isFilter = true;
        this.currentPage = 1;
        this.payOrderList = [];
        this.drawOrderList = [];
        this.transferOrderList = [];
        this.inOrOutOrderList = [];
        this.isShowPopover = false;
        this.defaultType = this.selectType;
        this.getDataList();
      },

      //下拉刷新
      onPullingDown() {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)
      },

      //上拉加载
      onPullingUp() {
        setTimeout(() => {
          this.currentPage = this.currentPage + 1;
          this.getDataList();
        }, 1000)
      }
    },
  }
</script>

<style scoped>

</style>
