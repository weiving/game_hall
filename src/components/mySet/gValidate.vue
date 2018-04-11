<template>
  <div id="gValidate" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('mySet')">
        <img src="/static/img/left.png"/>
      </div>
      <div class="title">谷歌验证</div>
    </div>
    <div class="page-content">
      <div class="secret">
        <!--<vue-q-art :config="config"></vue-q-art>-->
        <vue-qr :text="gauth_url"></vue-qr>
      </div>
      <div class="box-item">
        <div class="secret-row">
          <div class="col-12">秘钥:</div>
          <div class="col-88">
            <p class="secret-val">{{gsecret}}</p>
          </div>
        </div>
      </div>
      <div class="box-item" @touchstart.stop="focus">
        <div class="col-xs-2 col-item" v-for="(pas,i) in pasDigits" :key="i">
          <input type="text" :value="val[i]" disabled>
        </div>
      </div>
      <!--<div class="tip-row">-->
      <!--<p>重新获取验证码(53)</p>-->
      <!--</div>-->
      <div class="default-btn" :class="{active:val.length===6}" @click="setCode">
        <p>下一步</p>
      </div>
      <keyboard :show="keyboard" @typing="typing" @complete="blur"></keyboard>
      <div class="mask" v-if="isShow_msg" @click="showMask"></div>
      <div class="mask-text" v-if="isShow_msg" @click="showMask" style="height: 60px;">
        <span>{{msg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalStorage} from "../../../static/js/util";
  import keyboard from '../recharge/keyboard'
  // import VueQArt from 'vue-qart'
  import VueQr from 'vue-qr'

  export default {
    name: "g-Validate",
    components: {
      keyboard,
      // VueQArt
      VueQr
    },
    props: {
      pasDigits: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        user_id: getLocalStorage('user_id'),
        username: getLocalStorage('username'),
        session: getLocalStorage('session'),
        cursor: false,
        keyboard: false,
        val: [],
        cursorDuration: 600,
        gauth_url: '',
        gsecret: '',
        isShow_msg: false,
        msg: ''
      }
    },
    created() {
      document.addEventListener('touchstart', () => {
        this.blur();
      });
      this.getSecret();
    },
    methods: {
      focus() {
        /*显示键盘*/
        this.showKeyboard();
      },
      blur() {
        this.hideKeyboard();
      },
      showKeyboard() {
        this.keyboard = true;
      },
      hideKeyboard() {
        this.keyboard = false;
      },
      del() {
        /*删除值并不会触发值的校验，所以需要手动再出发一次*/
        this.val = this.val.slice(0, -1);
      },

      /*输入*/
      typing(value) {
        /*如果是点击删除*/
        if (value === '') {
          this.del();
        } else if (value == '.') {
          return
        } else {
          if (this.val.length === 5) {
            this.val = this.val + value;
            this.hideKeyboard();
            return;
          } else if (this.val.length >= 6) {
            this.hideKeyboard();
            return;
          } else {
            this.val = this.val + value;
          }
        }
      },

      getSecret() {
        this.$http
          .post(`${this.$api}/v1/userdata/w/generate_gsecret/${this.user_id}/${this.username}?session=${this.session}`)
          .then(res => {
            var resData = res.data;
            if (resData.success === true) {
              this.gauth_url = resData.data.gauth_url;
              this.gsecret = resData.data.gsecret;
            }
          })
      },
      setCode() {
        var that = this;
        if (this.val.length === 6) {
          var params = new URLSearchParams();
          // params.append('gsecret', this.gsecret);
          params.append('gcode', this.val);
          this.$http
            .post(`${this.$api}/v1/userdata/w/set_gsecret/${this.user_id}/${this.username}?session=${this.session}`, params)
            .then(res => {
              var resData = res.data;
              if (resData.success === true) {
                this.isShow_msg = true;
                this.msg = resData.msg;
                setTimeout(function () {
                  that.$root.Bus.$emit('toggleComponent', 'mySet');
                }, 1500)
              } else {
                this.isShow_msg = true;
                this.msg = resData.msg;
              }
            })
        }
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      showMask: function () {
        this.isShow_msg = false;
        this.msg = "";
      },
    }

  }
</script>

<style scoped>

</style>
