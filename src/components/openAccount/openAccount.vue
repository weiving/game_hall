<template>
  <div id="openAccount" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('my')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">开户中心</div>
      <div class="page-head-btn" @click="togglePopover">筛选</div>
    </div>
    <div class="page-content">
      <ul class="nav-tabs record-nav">
        <li class="col-xs-4" v-for="(item,index) in openAccountType">
          <a :class="{'active':defaultType==item}" @click="toggleType(item)">{{openAccountCenter[index]}}</a>
        </li>
      </ul>
      <div class="tabs-content openCenter">
        <div class="operationType" v-if="defaultType=='addLower'">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户名</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">密码</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="默认密码123456">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">返点值</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="默认0">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户类型</div></div>
              <div class="col-xs-8 text-right">
                请选择
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
          </div>
          <div class="default-btn">确认</div>
        </div>
        <div class="operationType" v-if="defaultType=='linkOpen'">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户类型</div></div>
              <div class="col-xs-8 text-right">
                请选择
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">返点值</div></div>
              <input type="text" class="col-xs-8 input-text" placeholder="默认0">
            </div>
            <div class="row linkUrl">
              <div class="col-xs-12">
                <textarea class="text" placeholder="链接地址"></textarea>
              </div>
            </div>
          </div>
          <div class="default-btn">生成</div>
        </div>
        <div class="operationType" v-if="defaultType=='linkManage'">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-6 text-left">用户类型</div>
              <div class="col-xs-6 text-right">64笔数</div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-left">返点信息</div>
              <div class="col-xs-6 text-right">64笔数</div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-left">备注</div>
              <div class="col-xs-6 text-right">64笔数</div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-left">注册量</div>
              <div class="col-xs-6 text-right">64笔数</div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-left">注册链接地址</div>
              <div class="col-xs-6 text-right">64笔数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slideDown">
      <div class="query-popover" v-show="isShowPopover">
        <div class="popover-body">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-4"><div class="row-label">用户类型</div></div>
              <div class="col-xs-8 text-right">
                请选择<img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">返点信息</div></div>
              <input type="text" v-model="rebates" class="col-xs-8 input-text" placeholder="请输入内容">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">备注</div></div>
              <input type="text" v-model="remark" class="col-xs-8 input-text" placeholder="请输入内容">
            </div>
            <div class="row">
              <div class="col-xs-4"><div class="row-label">注册量</div></div>
              <input type="text" v-model="registerNum" class="col-xs-8 input-text" placeholder="请输入内容">
            </div>
          </div>
          <!--<div class="popover-row">-->
            <!--<div class="col-xs-4">用户类型</div>-->
            <!--<div class="col-xs-8 text-right">-->
              <!--请选择<img src="/static/img/wind01.png" class="next-icon">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="popover-row">-->
            <!--<div class="col-xs-4 text-left">返点信息</div>-->
            <!--<input type="text" v-model="rebates" class="col-xs-8 input-text" placeholder="请输入内容">-->
          <!--</div>-->
          <!--<div class="popover-row">-->
            <!--<div class="col-xs-4 text-left">备注</div>-->
            <!--<input type="text" v-model="remark" class="col-xs-8 input-text" placeholder="请输入内容">-->
          <!--</div>-->
          <!--<div class="popover-row">-->
            <!--<div class="col-xs-4 text-left">注册量</div>-->
            <!--<input type="text" v-model="registerNum" class="col-xs-8 input-text" placeholder="请输入内容">-->
          <!--</div>-->
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
  export default {
    name: "open-account",
    data() {
      return {
        openAccountCenter: ['添加下级', '链接开户', '链接管理'],
        openAccountType: ['addLower', 'linkOpen', 'linkManage'],
        defaultType: 'addLower',
        isShowPopover: false,
        rebates: '',
        remark: '',
        registerNum: ''
      }
    },
    methods: {
      toggleType(type) {
        this.defaultType = type;
      },
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped>

</style>
