<template>
  <div id="teamStatistics" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title" @click="toComponent('gameStatistics')">团队统计</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <div class="row-data">
        <div class="row">
          <div class="col-xs-4 item border-bottom border-right">
            <div class="number">95</div>
            <div class="label">今日注册</div>
          </div>
          <div class="col-xs-4 item border-bottom border-right">
            <div class="number">4615</div>
            <div class="label">在线人数</div>
          </div>
          <div class="col-xs-4 item ">
            <div class="number">7041</div>
            <div class="label">团队余额</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 item">
            <div class="number">11</div>
            <div class="label">团队人数</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">95</div>
            <div class="label">今日充值</div>
          </div>
          <div class="col-xs-4 item">
            <div class="number">95</div>
            <div class="label">今日取款</div>
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
            <div class="title">游戏选择</div>
            <div class="row-content">
              <select name="gameList" class="gameList">
                <option class="row-btn-3" v-for="(item,index) in gameList" :value=item.id>{{item.name}}</option>
              </select>
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
  import {getLocalStorage, formatDate} from "../../../static/js/util";
  import VeLine from 'v-charts/lib/line'

  export default {
    name: "team-statistics",
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

        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        gameList: [],
        selectedGame: '',

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
      },
        this.chartSettings = {
          stack: {'售价': ['取款', '充值']},
          area: true,
          label: {
            normal: {
              show: true
            }
          },
          yAxisName: ['金额（元）']
        },
        this.getGameList();
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
        this.start_date = '2018-01-01';
        this.end_date = '2018-01-01';
      },

      //筛选
      filter() {

      },

      getGameList() {
        var params = new URLSearchParams();
        params.append('args', '{}');
        this.$http
          .post(`${this.$api}/v1/game/r/list/${this.user_id}/{${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            console.log('游戏列表', resData);
            if (resData.success = true) {
              this.gameList = resData.data.list;
              console.log('list', this.gameList);
            } else {

            }
          }).catch(err => {
        })
      },
    },
    components: {
      VeLine
    }
  }
</script>

<style scoped>

</style>
