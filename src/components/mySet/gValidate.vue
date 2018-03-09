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
        <vue-q-art :config="config"></vue-q-art>
      </div>
      <div class="box-item" @touchstart.stop="focus">
        <div class="col-xs-2 col-item" v-for="(pas,i) in pasDigits" :key="i">
          <input type="text" :value="val[i]" disabled>
        </div>
      </div>
      <div class="tip-row">
        <p>重新获取验证码(53)</p>
      </div>
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
  import {getLocalStorage} from "../../static/js/util";
  import keyboard from '../recharge/keyboard'
  import VueQArt from 'vue-qart'

  export default {
    name: "g-Validate",
    components: {
      keyboard,
      VueQArt
    },
    props: {
      pasDigits: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        cursor: false,
        keyboard: false,
        val: [],
        cursorDuration: 600,
        // gauth_url: '',
        gsecret: '',
        config: {
          value: '',
          imagePath: '/static/img/left.png',
          filter: 'color'
        },
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
        }
        if (value === '.') {
          this.hideKeyboard();
          return;
        }
        if (this.val.length >= 6) {
          this.hideKeyboard();
          return;
        } else if (this.val.length === 5) {
          this.val = this.val + value;
          this.hideKeyboard();
          return;
        } else {
          this.val = this.val + value;
        }
      },

      getSecret() {
        var user_id = getLocalStorage('user_id');
        var username = getLocalStorage('username');
        var session = getLocalStorage('session');

        this.$http
          .post(`${this.$api}/v1/userdata/w/generate_gsecret/${user_id}/${username}?session=${session}`)
          .then(res => {
            if (res.data.success === true) {
              console.log('总的', res.data.data);
              this.config.value = res.data.data.gauth_url;
              this.gsecret = res.data.data.gsecret;
              console.log('密钥', this.gsecret);
            }
          })
      },
      setCode() {
        if (this.val.length === 6) {
          console.log('进入22')
          var user_id = getLocalStorage('user_id');
          var username = getLocalStorage('username');
          var session = getLocalStorage('session');
          var params = new URLSearchParams();
          params.append('gsecret', this.gsecret);
          params.append('gcode', this.val);
          // console.log(this.val)
          this.$http
            .post(`${this.$api}/v1/userdata/w/set_gsecret/${user_id}/${username}?session=${session}`, params)
            .then(res => {
              console.log('返回', res.data);
              if (res.data.success === true) {

              }
              this.isShow_msg = true;
              this.msg = res.data.msg;
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
