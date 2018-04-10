<template>
  <div id="gameStatistics" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('teamStatistics')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">团队统计</div>
    </div>
    <div class="page-content">
      <div class="row-data">
        <div class="game-title">德州扑克</div>
        <div class="row">
          <div class="col-xs-4 item">
            <div class="number">95</div>
            <div class="label">活动奖励</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">4615</div>
            <div class="label">转入</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">7041</div>
            <div class="label">转出</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 item">
            <div class="number">11</div>
            <div class="label">游戏量</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">95</div>
            <div class="label">游戏返点</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">95</div>
            <div class="label">实际盈亏</div>
          </div>
        </div>
      </div>
      <div class="row-charts">
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </div>
    </div>
    <transition name="slideDown">
      <div class="query-popover" v-show="isShowPopover">
        <div class="popover-body">
          <div class="popover-row">
            <div class="title">选择类型</div>
            <div class="row-content">
              <!--<div class="row-btn-3" v-for="(item,index) in reportType" :class="{'active':selectType==item}"-->
              <!--@click="selectReportType(item)">-->
              <!--{{reportName[index]}}-->
              <!--</div>-->
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
  import VeLine from 'v-charts/lib/line'

  export default {
    name: "game-statistics",
    data() {
      return {
        isShowPopover: false,
        start_date: '2018-01-01',
        end_date: '2018-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
        chartData: '',
        chartSettings: '',
      }
    },
    created: function () {
      this.chartData = {
        columns: ['日期', '取款', '充值'],
        rows: [
          {'日期': '1月1日', '取款': 1523, '充值': 1523},
          {'日期': '1月2日', '取款': 1223, '充值': 1323},
          {'日期': '1月3日', '取款': 2123, '充值': 1823},
          {'日期': '1月4日', '取款': 4123, '充值': 1523},
          {'日期': '1月5日', '取款': 3123, '充值': 1523},
          {'日期': '1月6日', '取款': 7123, '充值': 1523}
        ]
      }
      this.chartSettings = {
        stack: {'售价': ['取款', '充值']},
        area: true,
        label: {
          normal: {
            show: true
          }
        },
        yAxisName: ['数量']
      }
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },

      //重置
      reset() {
        this.selectType = 'gameReport';
        this.start_date = '2018-01-01';
        this.end_date = '2018-01-01';
      },

      //筛选
      filter() {
        this.isFilter = true;
        this.currentPage = 1;
        if (this.selectType == "personalReport") {
          this.getPersonalReportList();
          this.isShowPopover = false;
          this.defaultType = this.selectType;
        } else {
          this.getGameReportList();
          this.isShowPopover = false;
          this.defaultType = this.selectType;
        }

      },
    },
    components: {
      VeLine
    }
  }
</script>

<style scoped>

</style>
