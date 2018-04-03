<template>
  <div id="reportRecord" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">报表查询</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-6" v-for="(item,index) in reportType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{reportName[index]}}</a>
        </li>
      </ul>
      <div class="tabs-content">
        <div class="recordType" v-if="defaultType=='gameReport'">
          <div class="record-list">
            <div class="row" v-for="(item,index) in gameReportList">
              <div class="row-title">用户账号 <span class="number">{{item.user_name}}</span></div>
              <div class="row-content" @click="enter_detail(item.user_id,defaultType)">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">{{parseFloat(item.bet).toFixed(2)}}</div>
                  <div class="col-name">总下注额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">{{parseFloat(item.game_rebate).toFixed(2)}}</div>
                  <div class="col-name">游戏返水</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">{{parseFloat(item.waste).toFixed(2)}}</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-item" v-if="gameReportList==null">
            <p>暂无数据</p>
          </div>
          <div class="pagination-wrap" v-if="pages>=1">
            <pagination
              :page-index="currentPage"
              :pages="pages"
              :total="total"
              :page-size="pageSize"
              @change="pageChange">
            </pagination>
          </div>
        </div>
        <div class="recordType" v-if="defaultType=='personalReport'">
          <div class="record-list">
            <div class="row" v-for="(item,index) in personalReportList">
              <div class="row-title">用户账号 <span class="number">{{item.user_name}}</span></div>
              <div class="row-content" @click="enter_detail(item.user_id,defaultType)">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">{{parseFloat(item.bet).toFixed(2)}}</div>
                  <div class="col-name">总下注额</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">{{parseFloat(item.game_rebate).toFixed(2)}}</div>
                  <div class="col-name">游戏返水</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">{{parseFloat(item.waste).toFixed(2)}}</div>
                  <div class="col-name">实际盈亏</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-item" v-if="personalReportList==null">
            <p>暂无数据</p>
          </div>
          <div class="pagination-wrap" v-if="pages>=1">
            <pagination
              :page-index="currentPage"
              :pages="pages"
              :total="total"
              :page-size="pageSize"
              @change="pageChange">
            </pagination>
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
              <div class="row-btn-3" v-for="(item,index) in reportType" :class="{'active':selectType==item}"
                   @click="selectReportType(item)">
                {{reportName[index]}}
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
  import pagination from '../common/pagination'

  export default {
    name: "report-record",
    data() {
      return {
        // reportName: ["游戏报表", "个人报表", "平台报表"],
        // reportType: ['gameReport', 'personalReport', 'platformReport'],

        reportName: ["游戏报表", "个人报表"],
        reportType: ['gameReport', 'personalReport'],
        defaultType: 'gameReport',
        isShowPopover: false,
        start_date: '2018-01-01',
        end_date: '2018-01-01',
        yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
        monthFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
        dayFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',

        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        gameReportList: [],
        personalReportList: [],
        platformReportList: [],

        currentPage: 1,
        pages: 0,
        pageSize: 5,
        total: 0,

        selectType: 'gameReport',
        isFilter: false,

      }
    },
    created() {
      this.getGameReportList();
    },
    methods: {
      enter_detail(id, type) {
        if (type == 'personalReport') {
          setLocalStorage('reportDetailId', id);
          setLocalStorage('reportType', type);
          this.$root.Bus.$emit('toggleComponent', 'reportDetail')
        } else {
          setLocalStorage('userGameId', id);
          this.$root.Bus.$emit('toggleComponent', 'reportUserGame')
        }
      },
      toggleType(type) {
        this.defaultType = type;
        this.currentPage = 1;
        this.pages = 0;
        this.pageSize = 5;
        this.total = 0;
        this.isFilter = false;
        if (type == "personalReport") {
          this.getPersonalReportList();
        } else {
          this.getGameReportList();
        }
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      //从pageu组件传递过来的当前page
      pageChange(page) {
        this.currentPage = page;
        if (this.defaultType == "personalReport") {
          this.getPersonalReportList();
        } else {
          this.getGameReportList();
        }
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

      getGameReportList() {
        var minDay = this.getTime('').minDay;
        var maxDay = this.getTime('').maxDay;

        var params = new URLSearchParams();
        var obj = {
          start_time: minDay,
          end_time: maxDay,
          page_index: this.currentPage,
          page_size: this.pageSize,
          operator_id: this.user_id
        }
        params.append('args', JSON.stringify(obj));
        this.$http
          .post(`${this.$api}/v1/report/r/game/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.gameReportList = resData.data.list;
              this.currentPage = parseInt(resData.data.page_index);
              this.pages = parseInt(resData.data.pages);
              this.pageSize = parseInt(resData.data.page_size);
              this.total = parseInt(resData.data.total);
            } else {

            }
          })
      },

      getPersonalReportList() {
        var minDay = this.getTime('').minDay;
        var maxDay = this.getTime('').maxDay;

        var params = new URLSearchParams();
        var obj = {
          start_time: minDay,
          end_time: maxDay,
          page_index: this.currentPage,
          page_size: this.pageSize,
          operator_id: this.user_id
        }
        params.append('args', JSON.stringify(obj));
        this.$http
          .post(`${this.$api}/v1/report/r/user/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.personalReportList = resData.data.list;
              this.currentPage = parseInt(resData.data.page_index);
              this.pages = parseInt(resData.data.pages);
              this.pageSize = parseInt(resData.data.page_size);
              this.total = parseInt(resData.data.total);
            } else {

            }
          })
      },

      // getPlatformReportList() {
      //   var minDay = this.getTime('').minDay;
      //   var maxDay = this.getTime('').maxDay;
      //
      //   var params = new URLSearchParams();
      //   var obj = {
      //     start_time: minDay,
      //     end_time: maxDay,
      //     page_index: this.currentPage,
      //     page_size: this.pageSize,
      //     operator_id: this.user_id
      //   }
      //   params.append('args', JSON.stringify(obj));
      //   this.$http
      //     .post(`${this.$api}/v1/report/r/platform/${this.user_id}/${this.username}?session=${this.session}`, params)
      //     .then(res => {
      //       var resData = res.data;
      //       console.log('平台', resData);
      //       if (resData.success == true) {
      //         this.platformReportList = resData.data.list;
      //         this.currentPage = parseInt(resData.data.page_index);
      //         this.pages = parseInt(resData.data.pages);
      //         this.pageSize = parseInt(resData.data.page_size);
      //         this.total = parseInt(resData.data.total);
      //       } else {
      //
      //       }
      //     })
      // },

      //选择报表类型
      selectReportType(type) {
        this.selectType = type;
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
      pagination
    },

  }
</script>

<style scoped>

</style>
