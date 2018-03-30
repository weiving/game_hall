<template>
  <div id="reportRecord" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('reportRecord')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">用户游戏报表</div>
    </div>
    <div class="page-content">
      <div class="tabs-content">
        <div class="recordType">
          <div class="record-list">
            <div class="row" v-for="(item,index) in userGameList">
              <div class="row-title">用户账号 <span class="number">{{item.user_name}}</span></div>
              <div class="row-content">
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
                  <div class="text-detail" @click="enter_detail(item.user_id,'gameReport')">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-item" v-if="userGameList==null">
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
  </div>

</template>

<script>
  import {setLocalStorage, getLocalStorage, removeLocalStorage} from "../../../static/js/util";
  import pagination from '../common/pagination'

  export default {
    name: "report-user-game",
    data() {
      return {
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        userGameList: [],

        currentPage: 1,
        pages: 1,
        pageSize: 5,
        total: 0,
      }
    },
    created() {
      this.getUserGameList()
    },
    methods: {
      getUserGameList() {
        var userGameId = getLocalStorage('userGameId');
        var params = new URLSearchParams();
        var obj = {
          user_id: userGameId,
          page_index: this.currentPage,
          page_size: this.pageSize,
          operator_id: this.user_id
        }
        params.append('args', JSON.stringify(obj));
        this.$http
          .post(`${this.$api}/v1/report/r/game_daily/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.userGameList = resData.data.list;
              this.currentPage = parseInt(resData.data.page_index);
              this.pages = parseInt(resData.data.pages);
              this.pageSize = parseInt(resData.data.page_size);
              this.total = parseInt(resData.data.total);
            } else {
              this.userGameList = resData.data.list;
            }
          })
      },
      enter_detail(id, type) {
        setLocalStorage('reportDetailId', id);
        setLocalStorage('reportType', type);
        this.$root.Bus.$emit('toggleComponent', 'reportDetail')
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
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
    components: {
      pagination
    },
    destroyed() {
      removeLocalStorage('userGameId');
    }
  }
</script>

<style scoped>

</style>
