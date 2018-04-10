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
            <div class="row" v-for="(item,index) in lowerUserList">
              <div class="row-title">创建时间<span class="number">{{item.created_at}}</span></div>
              <div class="row-content">
                <div class="col-xs-4 text-left">
                  <div class="col-data text-orange">{{item.name}}</div>
                  <div class="col-name">账号</div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="col-data">{{item.level}}</div>
                  <div class="col-name">用户等级</div>
                </div>
                <div class="col-xs-4 text-right">
                  <div class="col-data text-red">{{item.p_name}}</div>
                  <div class="col-name">父账号</div>
                </div>
                <div class="col-xs-1">
                  <div class="text-detail" @click="enter_detail(item.id,defaultType)">
                    <i class="more-detail"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box-item" v-if="lowerUserList==null||lowerUserList==''">
            暂无数据
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
        <div class="recordType" v-if="defaultType=='blendRecord'">
          <div class="record-list">
            <div class="row" v-for="(item,index) in blendList">
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
          <div class="box-item" v-if="blendList==null||blendList==''">
            暂无数据
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
        <div class="recordType" v-if="defaultType=='lowerRecharge'">
          <div class="record-list">
            <div class="row" v-for="(item,index) in rechargeList">
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
          </div>
          <div class="box-item" v-if="rechargeList==null||rechargeList==''">
            暂无数据
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
        <div class="recordType" v-if="defaultType=='lowerWithdrawals'">
          <div class="record-list">
            <div class="row" v-for="(item,index) in withdrawalsList">
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
          <div class="box-item" v-if="withdrawalsList==null||withdrawalsList==''">
            暂无数据
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
          <div class="row-body">
            <div class="row row-head">
              <div class="title">选择类型</div>
              <div class="row-content">
                <div class="row-btn-4" v-for="(item,index) in lowerType" :class="{'active':selectType==item}"
                     @click="selectTypeFn(item)">
                  {{lowerName[index]}}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">用户名</div>
              </div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">余额范围</div>
              </div>
              <div class="col-xs-8 row-inline">
                <input type="text" class="input-lower">
                <span></span>
                <input type="text" class="input-high">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">返点范围</div>
              </div>
              <div class="col-xs-8 row-inline">
                <input type="text" class="input-lower">
                <span></span>
                <input type="text" class="input-high">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">用户类型</div>
              </div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">在线状态</div>
              </div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">下级所属</div>
              </div>
              <div class="col-xs-8 text-right">请选择 <img src="/static/img/wind01.png" class="next-icon"></div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">排序</div>
              </div>
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
  import {getLocalStorage, setLocalStorage} from "../../../static/js/util";
  import pagination from '../common/pagination'

  export default {
    name: "lower-manage",
    data() {
      return {
        lowerName: ['下级管理', '调点记录', '下级充值', '下级取款'],
        lowerType: ['lowerManage', 'blendRecord', 'lowerRecharge', 'lowerWithdrawals'],
        defaultType: 'lowerManage',
        isShowPopover: false,

        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        lowerUserList: [],
        blendList: [],
        rechargeList: [],
        withdrawalsList: [],

        currentPage: 1,
        pages: 0,
        pageSize: 5,
        total: 0,

        selectType: 'lowerManage',
        isFilter: false,

      }
    },
    created() {
      this.getLowerList();
    },
    methods: {
      enter_detail(id, type) {
        setLocalStorage('lowerDetailId', id);
        setLocalStorage('lowerType', type);
        this.$root.Bus.$emit('toggleComponent', 'lowerDetail')
      },
      toggleType(type) {
        this.defaultType = type;
        this.currentPage = 1;
        this.pages = 0;
        this.pageSize = 5;
        this.total = 0;
        if (type == "blendRecord") {

        } else if (type == "lowerRecharge") {

        } else if (type == "lowerWithdrawals") {

        } else {
          this.getLowerList();
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
        if (this.defaultType == "blendRecord") {

        } else if (this.defaultType == "lowerRecharge") {

        } else if (this.defaultType == "lowerWithdrawals") {

        } else {
          this.getLowerList();
        }
      },

      getLowerList() {
        var obj = {
          type: 3,
          page_size: this.pageSize,
          page_index: this.currentPage,
          operator_id: this.user_id
        }
        var params = new URLSearchParams();
        params.append('args', JSON.stringify(obj));
        this.$http
          .post(`${this.$api}/v1/user/r/get_children/${this.user_id}/${this.username}?session=${this.session}`, params)
          .then(res => {
            var resData = res.data;
            console.log('下级列表', resData);
            if (resData.success == true) {
              this.lowerUserList = resData.data.list;
              this.currentPage = resData.data.page_index;
              this.pages = resData.data.pages;
              this.pageSize = resData.data.page_size;
              this.total = resData.data.total;
            } else {

            }
          })
      },

      selectTypeFn(type) {
        this.selectType = type;
      },
    },
    components: {
      pagination
    }
  }
</script>

<style scoped>

</style>
