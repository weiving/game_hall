<template>
  <div id="record" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">记录查询</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-nav">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-4" v-for="(item,index) in recordType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{recordName[index]}}</a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="tabs-content" v-if="defaultType=='fundRecord'">
        <div class="box-item" v-if="funRecordList==null || funRecordList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="funRecordList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in funRecordList">
            <div class="row-title">用户账号<span class="number">{{item.name}}</span></div>
            <div class="row-content" @click="enter_detail(item.id,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.p_name}}</div>
                <div class="col-name">父代理账号</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.rebate}}</div>
                <div class="col-name">返点比例</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{item.money}}</div>
                <div class="col-name">佣金金额</div>
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
      <div class="tabs-content" v-if="defaultType=='accountRecord'">
        <div class="box-item" v-if="accountRecordList==null || accountRecordList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="accountRecordList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in accountRecordList">
            <div class="row-title">用户账号<span class="number">{{item.name}}</span></div>
            <div class="row-content" @click="enter_detail(item.id,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.p_name}}</div>
                <div class="col-name">父代理账号</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.rebate}}</div>
                <div class="col-name">返点比例</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{item.money}}</div>
                <div class="col-name">佣金金额</div>
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
      <div class="tabs-content" v-if="defaultType=='agentRecord'">
        <div class="box-item" v-if="agentRecordList==null || agentRecordList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="agentRecordList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="row" v-for="(item,index) in agentRecordList">
            <div class="row-title">用户账号<span class="number">{{item.name}}</span></div>
            <div class="row-content" @click="enter_detail(item.id,defaultType)">
              <div class="col-xs-4 text-left">
                <div class="col-data text-orange">{{item.p_name}}</div>
                <div class="col-name">父代理账号</div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="col-data">{{item.rebate}}</div>
                <div class="col-name">返点比例</div>
              </div>
              <div class="col-xs-4 text-right">
                <div class="col-data text-red">{{item.money}}</div>
                <div class="col-name">佣金金额</div>
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
              <div class="row-btn-3" v-for="(item,index) in recordType" :class="{'active':selectType==item}"
                   @click="selectTypeFn(item)">
                {{recordName[index]}}
              </div>
            </div>
          </div>
          <div class="popover-row">
            <div class="title">查询类型</div>
            <div class="row-content">
              <div class="row-btn-3" :class="{active:searchType==index+1}" v-for="(item,index) in searchTypeNameList"
                   @click="selectSearchTypeFn(index+1)">{{item}}
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
    name: "record",
    data() {
      return {
        recordName: ['资金流水', '帐变记录', '代理记录'],
        recordType: ['fundRecord', 'accountRecord', 'agentRecord'],
        defaultType: 'fundRecord',
        isShowPopover: false,
        start_date: '2018-01-01',
        end_date: '2018-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',

        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        funRecordList: [],
        accountRecordList: [],
        agentRecordList: [],

        currentPage: 1,
        pageSize: 5,

        selectType: 'fundRecord',
        isFilter: false,
        searchUserId: '',
        searchTypeNameList: ['单个', '直属', '全部'],
        searchType: 3,
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
        setLocalStorage('recordDetailId', id);
        setLocalStorage('recordType', type);
        this.$root.Bus.$emit('toggleComponent', 'recordDetail');
      },
      toggleType(type) {
        this.defaultType = type;
        this.currentPage = 1;
        this.pageSize = 5;
        this.isFilter = false;
        this.funRecordList = [];
        this.accountRecordList = [];
        this.agentRecordList = [];
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
        var obj = {
          id: parseInt(this.searchUserId),
          type: this.searchType,
          start_time: minDay,
          end_time: maxDay,
          page_index: this.currentPage,
          page_size: this.pageSize,
          operator_id: this.user_id
        };
        params.append('args', JSON.stringify(obj));

        var url = '';
        if (this.defaultType == 'accountRecord') {

        } else if (this.defaultType == 'agentRecord') {

        } else {
          url = `/api/v1/record/r/bill/${this.user_id}/${this.username}?session=${this.session}`;
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
            if (this.defaultType == 'accountRecord') {
              this.accountRecordList = this.accountRecordList.concat(list);
            } else if (this.defaultType == 'agentRecord') {
              this.agentRecordList = this.agentRecordList.concat(list);
            } else {
              this.funRecordList = this.funRecordList.concat(list);
            }
            this.currentPage = parseInt(resData.data.page_index);
          } else {
            if (this.accountRecordList.length != 0 || this.agentRecordList.length != 0 || this.funRecordList.length != 0) {
              this.currentPage = this.currentPage - 1;
              this.$refs.scroll.forceUpdate()
            }
          }
        }

      },

      //选择报表类型
      selectTypeFn(type) {
        this.selectType = type;
      },

      selectSearchTypeFn(type) {
        this.searchType = type;
      },
      //重置
      reset() {
        this.selectType = 'fundRecord';
        this.start_date = '2018-01-01';
        this.end_date = '2018-01-01';
        this.searchType = 3;
      },

      //筛选
      filter() {
        this.isFilter = true;
        this.currentPage = 1;
        this.funRecordList = [];
        this.accountRecordList = [];
        this.agentRecordList = [];
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
    }
  }
</script>

<style scoped>

</style>
