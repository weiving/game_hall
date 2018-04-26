<template>
  <div id="lowerManage" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">下级管理</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-nav">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-3" v-for="(item,index) in lowerType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{lowerName[index]}}</a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="tabs-content" v-if="defaultType=='lowerManage'">
        <div class="box-item" v-if="lowerUserList==null||lowerUserList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="lowerUserList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
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
        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='blendRecord'">
        <div class="box-item" v-if="blendList==null||blendList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="blendList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
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
        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='lowerRecharge'">
        <div class="box-item" v-if="rechargeList==null||rechargeList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="rechargeList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
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
        </cube-scroll>
      </div>
      <div class="tabs-content" v-if="defaultType=='lowerWithdrawals'">
        <div class="box-item" v-if="withdrawalsList==null||withdrawalsList.length==0">
          <p>暂无数据</p>
        </div>
        <cube-scroll class="record-list" ref="scroll" v-else
                     :data="withdrawalsList"
                     :options="options"
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
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
        </cube-scroll>
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
        pageSize: 5,

        selectType: 'lowerManage',
        isFilter: false,

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
        setLocalStorage('lowerDetailId', id);
        setLocalStorage('lowerType', type);
        this.$root.Bus.$emit('toggleComponent', 'lowerDetail')
      },
      toggleType(type) {
        this.defaultType = type;
        this.currentPage = 1;
        this.lowerUserList = [];
        this.blendList = [];
        this.rechargeList = [];
        this.withdrawalsList = [];
        this.getDataList();
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },

      getDataList() {
        var params = new URLSearchParams();
        var obj = {
          type: 3,
          page_index: this.currentPage,
          page_size: this.pageSize,
          operator_id: this.user_id
        };
        params.append('args', JSON.stringify(obj));

        var url = '';
        if (this.defaultType == 'blendRecord') {

        } else if (this.defaultType == 'lowerRecharge') {

        } else if (this.defaultType == 'lowerWithdrawals') {

        } else {
          url = `${this.$api}/v1/user/r/get_children/${this.user_id}/${this.username}?session=${this.session}`;
        }
        if (url != "") {
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
            if (this.defaultType == 'blendRecord') {
              this.blendList = this.blendList.concat(list);
            } else if (this.defaultType == 'lowerRecharge') {
              this.rechargeList = this.rechargeList.concat(list);
            } else if (this.defaultType == 'lowerWithdrawals') {
              this.withdrawalsList = this.withdrawalsList.concat(list);
            } else {
              this.lowerUserList = this.lowerUserList.concat(list);
            }
            this.currentPage = parseInt(resData.data.page_index);
          } else {
            if (this.lowerUserList.length != 0 || this.blendList.length != 0 || this.rechargeList.length != 0 || this.withdrawalsList.length != 0) {
              this.currentPage = this.currentPage - 1;
              this.$refs.scroll.forceUpdate()
            }
          }
        }

      },

      selectTypeFn(type) {
        this.selectType = type;
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
