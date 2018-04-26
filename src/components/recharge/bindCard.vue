<template>
  <div id="bindCard" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('manageCard')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">绑定银行卡</div>
    </div>
    <div class="page-content">
      <div class="info-title">请输入您的身份信息</div>
      <div class="info-box">
        <div class="info-item">
          <span>真实姓名</span>
          <input type="text" v-model="name" readonly placeholder="请输入真实姓名" v-if="name">
          <input type="text" v-model="card_user" placeholder="请输入真实姓名" v-else>
        </div>
        <!--<div class="info-item">-->
        <!--<span>身份证号</span>-->
        <!--<input type="text" class="" value="894131653254913156464">-->
        <!--</div>-->
      </div>
      <div class="info-title">请输入您的银行卡信息
        <div class="tips"><i class="icon"></i>支持银行及限额</div>
      </div>
      <div class="info-box">
        <div class="info-item">
          <span>银行卡号</span>
          <input type="number" class="" v-model="card_no" placeholder="请输入银行卡号">
        </div>
        <div class="info-item" @click="showBankCardList">
          <input type="text" v-model="bank_name" class="bankName" placeholder="请选择银行">
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <div class="info-item" @click="showAddressList">
          <span>开户地区</span>
          <input type="text" class="address" v-model="address" placeholder="请选择开户地址">
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <!--<div class="info-item">-->
        <!--<span>手机号</span>-->
        <!--<input type="text" class="" value="15461234564">-->
        <!--</div>-->
        <!--<div class="info-item">-->
        <!--<span>短信验证</span>-->
        <!--<input type="text" class="" value="" placeholder="输入短信验证码">-->
        <!--<div class="get-code">获取验证码</div>-->
        <!--</div>-->
        <div class="info-item">
          <span>资金密码</span>
          <input type="text" class="" v-model="funds_password" placeholder="请输入资金密码">
        </div>
      </div>
      <div class="default-btn" @click="sureBind"
           :class="{active:funds_password.length>0&&bank_id.length>0&&bank_name.length>0&&card_no.length>0&&name.length>0&&address.length>0}">
        确认绑定
      </div>

    </div>
    <transition name="slideRight">
      <div class="slide-popover" v-show="isShowBankList">
        <div class="page-head">
          <div class="toReturn" @click="closeBankCardList">
            <img src="/static/img/left.png" alt="">
          </div>
        </div>
        <div class="bank-title">请选择储蓄卡所属银行</div>
        <div class="bankCardList">
          <div class="bankCard-item" v-for="(item,index) in bankCardList" :key="item.bank_id"
               @click="selectBankCardList(item.bank_id,item.bank_name)">
            <img :src="'/static/img/bank/bank-'+item.bank_id+'.png'" :alt=item.bank_name>
            <div class="bankCardInfo">
              <div class="bankName">{{item.bank_name}}</div>
              <div class="des">单笔限额5万,日限额5万</div>
            </div>
            <div class="select-radio"><i></i></div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slideRight">
      <div class="slide-popover" v-show="isShowAddressList">
        <div class="page-head">
          <div class="toReturn" @click="closeAddressList">
            <img src="/static/img/left.png" alt="">
          </div>
          <div class="title">选择省份</div>
        </div>
        <div class="addressList">
          <div class="address-item" v-for="(item,index) in addressList"
               @click="selectProvince(index)">
            <div class="name">{{item.name}}</div>
            <div class="select-radio" :class="{active:select_province_index==index}"><i></i></div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slideRight">
      <div class="slide-popover" v-show="isShowCityList">
        <div class="page-head">
          <div class="toReturn" @click="closeCityList">
            <img src="/static/img/left.png" alt="">
          </div>
          <div class="title">选择城市</div>
        </div>
        <div class="addressList">
          <div class="address-item" v-for="(item,index) in cityList" :key="index"
               @click="selectCity(index)">
            <div class="name">{{item.name}}</div>
            <div class="select-radio" :class="{active:select_city_index==index}"><i></i></div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="isShowMask" @click="hideMask"></div>
    <div class="mask-text" v-show="isShowMask"><span>{{msg}}</span></div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";

  export default {
    name: "bind-card",
    data() {
      return {
        funds_password: '',
        bank_id: '',
        bank_name: '',
        card_no: '',
        card_user: '',
        isShowBankList: false,
        isShowAddressList: false,
        isShowCityList: false,
        bankCardList: [],
        addressList: [],
        cityList: [],
        select_province_index: 0,
        select_city_index: 0,
        select_province: '',
        select_city: '',
        address: '',
        province_index: 0,
        city_index: 0,
        isShowMask: false,
        msg: '',
        name: '',
      }
    },
    created() {
      this.getName();
      this.getBankCardList();
      this.getAddressList();
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      getName() {
        var session = getLocalStorage("session");
        var user_id = getLocalStorage("user_id");
        var username = getLocalStorage("username");
        if (session == '' || session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/v1/userdata/r/user_info/${user_id}/${username}?session=${session}`)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                if (resData.data.name != undefined && resData.data.name != '') {
                  this.name = resData.data.name;
                }
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              this.$router.push({path: '/login'})
            })
        }
      },
      getBankCardList() {
        var session = getLocalStorage('session');
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');

        this.$http
          .post(`${this.$api}/v1/bank/r/find_bank_list/${user_id}/${username}?session=${session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success == true) {
              this.bankCardList = resData.data;
            }


          })
      },
      getAddressList() {
        this.addressList = this.$address;
      },

      //显示银行卡弹窗
      showBankCardList() {
        this.isShowBankList = true;

      },
      closeBankCardList() {
        this.isShowBankList = false;
      },
      selectBankCardList(bank_id, bank_name) {
        this.isShowBankList = false;
        this.bank_name = bank_name;
        this.bank_id = bank_id;
      },

      //显示地址弹窗
      showAddressList() {
        this.isShowAddressList = true;
        this.select_province_index = this.province_index;
        this.select_city_index = this.city_index;
      },
      closeAddressList() {
        this.isShowAddressList = false;
      },
      selectProvince(index) {
        if (this.select_province_index != index) {
          this.select_city_index = 0;
        }
        this.select_province_index = index;
        this.select_province = this.addressList[index].name;
        this.cityList = this.addressList[index].children;
        this.isShowCityList = true;
      },
      selectCity(index) {
        this.select_city_index = index;
        this.select_city = this.cityList[index].name;
        this.address = this.select_province + '  ' + this.select_city;
        this.province_index = this.select_province_index;
        this.city_index = this.select_city_index;
        this.isShowAddressList = false;
        this.isShowCityList = false;
      },
      closeCityList() {
        this.isShowCityList = false;
      },

      //确认绑定
      sureBind() {
        if (this.name == undefined || this.name == '') {
          if (this.card_user == undefined || this.card_user == '') {
            this.isShowMask = true;
            this.msg = '请填写真实姓名~';
            return;
          } else {
            this.name = this.card_user;
          }
        }

        if (this.card_no == undefined || this.card_no == '') {
          this.isShowMask = true;
          this.msg = '请填写银行卡号~';
          return;
        } else if (this.bank_name == undefined || this.bank_name == '') {
          this.isShowMask = true;
          this.msg = '请选择银行~';
          return;
        } else if (this.address == undefined || this.address == '') {
          this.isShowMask = true;
          this.msg = '请选择开户地址~';
          return;
        } else if (this.funds_password == undefined || this.funds_password == '') {
          this.isShowMask = true;
          this.msg = '请填写资金密码~';
          return;
        } else {
          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');
          var session = getLocalStorage('session');

          var params = new URLSearchParams();
          params.append('funds_password', this.funds_password);
          params.append('bank_id', this.bank_id);
          params.append('bank_name', this.bank_name);
          params.append('card_no', this.card_no);
          params.append('card_user', this.name);
          params.append('card_addr', this.address);
          params.append('is_lock', 0);

          this.$http
            .post(`${this.$api}/v1/bank/w/add_user_bank/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                this.isShowMask = true;
                this.msg = resData.msg;
                var that = this;
                setTimeout(function () {
                  this.isShowMask = false;
                  this.msg = '';
                  that.$root.Bus.$emit("toggleComponent", "manageCard");
                }, 1500)
              } else {
                this.isShowMask = true;
                this.msg = resData.msg;
              }
            });
        }


      },
      hideMask() {
        this.isShowMask = false;
      }


    }
  }
</script>

<style scoped lang="less">
  #bindCard {
    .info-title {
      height: 46px;
      padding: 15px 13px;
      font-size: 16px;
      position: relative;
      .tips {
        position: absolute;
        top: 17px;
        right: 10px;
        font-size: 14px;
        color: #5D97F9;
      }
    }
    .info-box {
      //height: 120px;
      background: #ffffff;
      .info-item {
        height: 60px;
        line-height: 60px;
        margin: 0 13px;
        border-bottom: solid 1px #EBEBEB;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .bankName {
          width: 80%;
        }
        span {
          display: inline-block;
          width: 20%;
          color: #C8C8C8;
          margin-right: 20px;
        }
        input {
          display: inline-block;
          width: 60%;
        }
        .address {
          display: inline-block;
          width: 60%;
        }
        .get-code {
          width: 100px;
          height: 30px;
          line-height: 30px;
          background: #2CD694;
          color: #ffffff;
          text-align: center;
          border-radius: 50px;
          box-shadow: 3px 3px 10px #B1F0D7;
          position: absolute;
          top: 15px;
          right: 0px;
        }
        .next-side {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 0px;
          right: 0px;
          .wind-icon {
            display: block;
            width: 7px;
            height: 13px;
            background: url("/static/img/wind01.png");
            background-size: cover;
            margin: 23px auto;
          }
        }
      }
    }
    .slide-popover {
      z-index: 102;
      background: #F1F5FD;
      .bank-title {
        height: 46px;
        padding: 15px 13px;
        font-size: 16px;
        color: #666666;
        position: relative;
      }

      .bankCardList {
        width: 100%;
        height: -webkit-calc(~"100vh - 96px");
        height: calc(~"100vh - 96px");
        overflow: auto;
        background: #ffffff;
        .bankCard-item {
          width: -webkit-calc(~"100vw - 28px");
          width: calc(~"100vw - 28px");
          height: 58px;
          border-bottom: 1px solid #F3F3F3;
          margin: 0 14px;
          position: relative;
          padding-top: 12px;
          padding-left: 42px;
          background: #ffffff;
          img {
            width: 35px;
            height: 35px;
            position: absolute;
            top: 12px;
            left: 0px;
          }
          .bankCardInfo {
            .bankName {
              font-size: 14px;
            }
            .des {
              margin-top: 10px;
              font-size: 12px;
              color: #C4C4C4;
            }
          }

          .select-radio {
            position: absolute;
            top: 20px;
            right: 15px;
            width: 19px;
            height: 19px;
            border: 1px solid #C4C4C4;
            border-radius: 50%;

            &.active {
              background: #5D97F9;
              border-color: #5D97F9;
              padding-left: 2px;
              i {
                display: inline-block;
                width: 6px;
                height: 2px;
                background: #ffffff;
                line-height: 0;
                font-size: 0;
                vertical-align: bottom;
                -webkit-transform: rotate(45deg) translateY(-30%) translateX(-10%);
                &:after {
                  content: '/';
                  display: block;
                  width: 10px;
                  height: 2px;
                  background: #ffffff;
                  //-webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
                  -webkit-transform: rotate(-90deg) translateY(30%) translateX(50%);
                }
              }
            }

          }
        }
      }

      .addressList {
        width: 100%;
        height: -webkit-calc(~"100vh - 50px");
        height: calc(~"100vh - 50px");
        overflow: auto;
        background: #ffffff;
        .address-item {
          width: -webkit-calc(~"100vw - 28px");
          width: calc(~"100vw - 28px");
          height: 58px;
          line-height: 58px;
          border-bottom: 1px solid #F3F3F3;
          margin: 0 14px;
          position: relative;
          .select-radio {
            position: absolute;
            top: 20px;
            right: 15px;
            width: 19px;
            height: 19px;
            border: 1px solid #C4C4C4;
            border-radius: 50%;

            &.active {
              background: #5D97F9;
              border-color: #5D97F9;
              padding-left: 2px;
              i {
                display: inline-block;
                width: 6px;
                height: 2px;
                background: #ffffff;
                line-height: 0;
                font-size: 0;
                vertical-align: bottom;
                -webkit-transform: rotate(45deg) translateY(-30%) translateX(-10%);
                position: absolute;
                top: 10px;
                &:after {
                  content: '/';
                  display: block;
                  width: 10px;
                  height: 2px;
                  background: #ffffff;
                  //-webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
                  -webkit-transform: rotate(-90deg) translateY(30%) translateX(50%);
                }
              }
            }

          }
        }
      }
    }
  }
</style>
