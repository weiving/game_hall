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
              <div class="col-xs-4">
                <div class="row-label">用户名</div>
              </div>
              <input type="text" class="col-xs-8 input-text" v-model="lower_username" placeholder="请输入用户名">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">密码</div>
              </div>
              <input type="password" class="col-xs-8 input-text" v-model="lower_password" placeholder="默认密码123456">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">选择平台</div>
              </div>
              <div class="col-xs-8 text-right" @click="showPlatform" :class="{'text-orange':selectPlatformStatus}">
                {{selectPlatformText}}
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">选择游戏</div>
              </div>
              <div class="col-xs-8 text-right" @click="showGame" :class="{'text-orange':selectGameStatus}">
                {{selectGameText}}
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">用户类型</div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="ordinary" @click="selectUserType(1)">
                  <label for="ordinary">普通</label>
                  <input type="radio" name="userType" id="ordinary">
                  <div class="user-defined" :class="{active:user_type==1}">
                    <span class="circle"></span>
                  </div>
                </div>
                <div class="agent" @click="selectUserType(2)">
                  <label for="agent">代理</label>
                  <input type="radio" name="userType" id="agent">
                  <div class="user-defined" :class="{active:user_type==2}">
                    <span class="circle"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="default-btn active" @click="addLowerFn">确认</div>
        </div>
        <div class="operationType" v-if="defaultType=='linkOpen'">
          <div class="row-body">
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">用户类型</div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="ordinary" @click="selectUserType(1)">
                  <label for="ordinary">普通</label>
                  <input type="radio" name="userType" id="ordinary">
                  <div class="user-defined" :class="{active:user_type==1}">
                    <span class="circle"></span>
                  </div>
                </div>
                <div class="agent" @click="selectUserType(2)">
                  <label>代理</label>
                  <input type="radio" name="userType">
                  <div class="user-defined" :class="{active:user_type==2}">
                    <span class="circle"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">有效次数</div>
              </div>
              <input type="text" class="col-xs-8 input-text" v-model="effective_times" placeholder="默认0">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">选择平台</div>
              </div>
              <div class="col-xs-8 text-right" @click="showPlatform" :class="{'text-orange':selectPlatformStatus}">
                {{selectPlatformText}}
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">选择游戏</div>
              </div>
              <div class="col-xs-8 text-right" @click="showGame" :class="{'text-orange':selectGameStatus}">
                {{selectGameText}}
                <img src="/static/img/wind01.png" class="next-icon">
              </div>
            </div>
            <div class="row linkUrl">
              <div class="col-xs-12">
                <textarea class="text" placeholder="链接地址" v-model="linkUrl"></textarea>
              </div>
            </div>
          </div>
          <div class="default-btn active" @click="createLinkUrl">生成</div>
        </div>
        <div class="operationType" v-if="defaultType=='linkManage'">
          <div class="linkManage">
            <div class="row-item">
              <div class="row">
                <div class="col-xs-l">注册链接</div>
                <div class="col-xs-r text-right">
                  <input type="text" value="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg"
                         alt="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg">
                </div>
                <div class="qrCode">
                  <i class="qrCode-icon"></i>
                </div>
              </div>
              <div class="row-detail">
                <div class="col-value">高频彩返点：<span class="text-color">7.0</span></div>
                <div class="col-value">低频彩返点：<span class="text-color">5.0</span></div>
                <div class="col-value">使用次数：<span class="text-color">64</span>/<span>999</span></div>
              </div>
            </div>
            <div class="row-item">
              <div class="row">
                <div class="col-xs-l">注册链接</div>
                <div class="col-xs-r text-right">
                  <input type="text" value="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg"
                         alt="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg">
                </div>
                <div class="qrCode">
                  <i class="qrCode-icon"></i>
                </div>
              </div>
              <div class="row-detail">
                <div class="col-value">高频彩返点：<span class="text-color">7.0</span></div>
                <div class="col-value">低频彩返点：<span class="text-color">5.0</span></div>
                <div class="col-value">使用次数：<span class="text-color">64</span>/<span>999</span></div>
              </div>
            </div>
            <div class="row-item">
              <div class="row">
                <div class="col-xs-l">注册链接</div>
                <div class="col-xs-r text-right">
                  <input type="text" value="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg"
                         alt="http://192.168.50.151:8000/#/registerCode?code=sdafhkdsfjg">
                </div>
                <div class="qrCode">
                  <i class="qrCode-icon"></i>
                </div>
              </div>
              <div class="row-detail">
                <div class="col-value">高频彩返点：<span class="text-color">7.0</span></div>
                <div class="col-value">低频彩返点：<span class="text-color">5.0</span></div>
                <div class="col-value">使用次数：<span class="text-color">64</span>/<span>999</span></div>
              </div>
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
              <div class="col-xs-4">
                <div class="row-label">用户类型</div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="ordinary" @click="selectUserType(1)">
                  <label for="ordinary">普通</label>
                  <input type="radio" name="userType" id="ordinary">
                  <div class="user-defined" :class="{active:user_type==1}">
                    <span class="circle"></span>
                  </div>
                </div>
                <div class="agent" @click="selectUserType(2)">
                  <label for="agent">代理</label>
                  <input type="radio" name="userType" id="agent">
                  <div class="user-defined" :class="{active:user_type==2}">
                    <span class="circle"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">返点信息</div>
              </div>
              <input type="text" v-model="rebates" class="col-xs-8 input-text" placeholder="请输入内容">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">备注</div>
              </div>
              <input type="text" v-model="remark" class="col-xs-8 input-text" placeholder="请输入内容">
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="row-label">注册量</div>
              </div>
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
    <transition name="slideRight">
      <div class="slide-popover platformPopover" v-show="isShowPlatformPopover">
        <div class="row-body">
          <div class="row" v-for="(item,index) in platformList" :key="index" @click="surePlatform(item.id)">
            {{item.name}}
          </div>
        </div>
      </div>
    </transition>
    <transition name="slideRight">
      <div class="slide-popover gamePopover" v-show="isShowGamePopover">
        <div class="row-body">
          <div class="row" v-for="(item,index) in gameList">
            <div class="col-xs-8">{{item.name}}</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值" v-model="item.code">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
          <div class="row">
            <div class="col-xs-8">游戏11111</div>
            <input type="text" class="col-xs-4 input-text" placeholder="请输入返点值">
          </div>
        </div>
        <div class="row-footer">
          <div class="opt-btn">重置</div>
          <div class="opt-btn sure-btn" @click="sureSelectGame">确定</div>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="isShowMask" @click="toggleShowMsg"></div>
    <div class="mask-text" v-show="isShowMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

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
        registerNum: '',

        isShowPlatformPopover: false,
        selectPlatformText: '请选择',
        selectPlatformStatus: false,
        platformList: [],
        platform_id: '',

        isShowGamePopover: false,
        selectGameText: '请选择',
        selectGameStatus: false,
        gameList: [],

        isShowMask: false,
        msg: '',

        lower_username: '',
        lower_password: '',
        user_type: 1,
        rebates: [],
        effective_times: '',
        linkUrl: ''
      }
    },
    created() {
      this.getLinkManageList();
    },
    methods: {
      toggleType(type) {
        this.defaultType = type;

        this.isShowPlatformPopover = false;
        this.selectPlatformText = '请选择';
        this.selectPlatformStatus = false;
        this.platformList = [];
        this.platform_id = '';

        this.isShowGamePopover = false;
        this.selectGameText = '请选择';
        this.selectGameStatus = false;
        this.gameList = [];
        this.user_type = 1;
      },
      /*筛选*/
      togglePopover() {
        this.isShowPopover = !this.isShowPopover;
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      /*选择平台*/
      showPlatform() {
        var session = getLocalStorage('session');
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');

        var params = new URLSearchParams();
        params.append('args', '{}');
        this.$http
          .post(`${this.$api}/v1/platform/r/list/${user_id}/${username}?session=${session}`, params)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.platformList = resData.data.list;
            }
          });
        this.isShowPlatformPopover = !this.isShowPlatformPopover;
      },
      surePlatform(id) {
        this.isShowPlatformPopover = !this.isShowPlatformPopover;
        this.selectPlatformText = '已选择';
        this.selectPlatformStatus = true;
        this.platform_id = id;
      },
      /*选择游戏*/
      showGame() {
        if (this.platform_id == "" || this.platform_id == undefined) {
          this.isShowMask = !this.isShowMask;
          this.msg = "请先选择平台";
        } else {
          var session = getLocalStorage('session');
          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');

          var params = new URLSearchParams();
          params.append('args', '{}');
          this.$http
            .post(`${this.$api}/v1/game/r/list/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                this.gameList = resData.data.list;
                for (var i = 0; i < this.gameList.length; i++) {
                  // this.gameList[i].code = 0;
                  this.$set(this.gameList[i], 'code', 0)
                }
              }
            });
          this.isShowGamePopover = !this.isShowGamePopover;
        }

      },
      sureSelectGame() {
        this.isShowGamePopover = !this.isShowGamePopover;
        this.selectGameText = '已选择';
        this.selectGameStatus = true;
        var gameList = this.gameList;
        var array = [];
        for (var i = 0; i < gameList.length; i++) {
          var platform_id = parseInt(this.platform_id);
          var game_id = parseInt(gameList[i].id);
          var rebate = gameList[i].code.toString();

          var obj = {
            'platform_id': platform_id,
            "game_id": game_id,
            "rebate": rebate
          };
          array.push(obj);
        }
        this.rebates = array;

      },
      toggleShowMsg() {
        this.isShowMask = !this.isShowMask;
      },
      /*选择用户类型*/
      selectUserType(type) {
        this.user_type = type;
      },

      /*添加下级*/
      addLowerFn() {
        if (this.lower_username == '' || this.lower_username == undefined) {
          this.isShowMask = true;
          this.msg = "请填写用户名";
          return
        } else if (this.lower_password == '' || this.lower_password == undefined) {
          this.isShowMask = true;
          this.msg = "请填写密码";
          return
        } else if (this.platform_id == '' || this.platform_id == undefined) {
          this.isShowMask = true;
          this.msg = "请选择平台";
          return
        } else if (this.rebates.length == 0 || this.rebates.length == undefined) {
          this.isShowMask = true;
          this.msg = "请选择游戏";
          return
        } else {

          var session = getLocalStorage('session');
          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');

          var rebates = JSON.stringify(this.rebates);
          console.log("rebates", rebates);
          var params = new URLSearchParams();
          params.append('username', this.lower_username);
          params.append('password', this.lower_password);
          params.append('user_type', this.user_type);
          params.append('rebates', rebates);

          this.$http
            .post(`${this.$api}/v1/user/w/add/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              console.log("添加下级", resData);
              if (resData.success == true) {
                this.isShowMask = true;
                this.msg = resData.msg;
                setTimeout(function () {
                  this.isShowMask = false;
                  this.msg = '';
                }, 1000)
              } else {
                this.isShowMask = true;
                this.msg = resData.msg;
              }
            });


        }

      },

      /*生成推广码*/
      createLinkUrl() {
        if (this.effective_times == '' || this.effective_times == undefined) {
          this.isShowMask = true;
          this.msg = "请填写有效次数";
          return
        } else if (this.platform_id == '' || this.platform_id == undefined) {
          this.isShowMask = true;
          this.msg = "请选择平台";
          return
        } else if (this.rebates.length == 0 || this.rebates.length == undefined) {
          this.isShowMask = true;
          this.msg = "请选择游戏";
          return
        } else {
          var session = getLocalStorage('session');
          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');


          var obj = {
            id: parseInt(user_id),
            sub_user_type: this.user_type,
            effective_times: parseInt(this.effective_times),
            rebates: this.rebates
          };
          var params = new URLSearchParams();
          params.append('args', JSON.stringify(obj));

          console.log('args', JSON.stringify(obj));

          this.$http
            .post(`${this.$api}/v1/user/w/gen_spread_code/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              console.log("推广码", resData);
              if (resData.success == true) {
                // this.isShowMask = true;
                // this.msg = resData.msg;
                var code = resData.data.spread_code;
                this.linkUrl = window.location.href + 'registerCode/?code=' + code;
              } else {
                this.isShowMask = true;
                this.msg = resData.msg;
              }
            });
        }


      },

      /*获取管理列表*/
      getLinkManageList() {

        var session = getLocalStorage('session');
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');

        var params = new URLSearchParams();
        params.append('page_size', 1);
        params.append('page_index', 10);

        this.$http
          .post(`${this.$api}/v1/user/r/get_spread_code_list/${user_id}/${username}?session=${session}`, params)
          .then(res => {
            var resData = res.data;
            console.log('链接数据', resData)

          })
      }
    }
  }
</script>

<style scoped>

</style>
