<template>
  <transition name="slide">
    <div class="keyboard animated" v-show="show" @touchstart.stop.prevent="fn">
      <div class="keyboard-head">
        <div class="keyboard-title">游戏大厅安全键盘</div>
        <span class="keyboard-hide" @touchstart="complete"><i class="hide-icon"></i></span>
      </div>
      <div class="keyboard-content">
        <div class="key-column-9">
          <div class="key-row">
            <div class="key-cell" @touchstart="typing('1')">1</div>
            <div class="key-cell" @touchstart="typing('2')">2</div>
            <div class="key-cell" @touchstart="typing('3')">3</div>
          </div>
          <div class="key-row">
            <div class="key-cell" @touchstart="typing('4')">4</div>
            <div class="key-cell" @touchstart="typing('5')">5</div>
            <div class="key-cell" @touchstart="typing('6')">6</div>
          </div>
          <div class="key-row">
            <div class="key-cell" @touchstart="typing('7')">7</div>
            <div class="key-cell" @touchstart="typing('8')">8</div>
            <div class="key-cell" @touchstart="typing('9')">9</div>
          </div>
          <div class="key-row">
            <div class="key-cell" @touchstart="typing('.')">.</div>
            <div class="key-cell" @touchstart="typing('0')">0</div>
            <div class="key-cell" @touchstart="complete">
              <div class="keyboard-done">
                <i class="keyboard-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="key-column-3">
          <div class="key-row">
            <div class="key-del" @touchstart="typing('')">
              <i class="del-icon"></i>
            </div>
          </div>
          <div class="key-row">
            <div class="key-confirm" @touchstart="complete">确定</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['show'],
    methods: {
      /*防止点击完成按钮左边的空白区域收起键盘*/
      fn() {
      },
      /*输入*/
      typing(val) {
        this.$emit('typing', val);
      },
      /*点击完成*/
      complete() {
        this.$emit('complete');
      }
    }
  }
</script>

<style scoped lang="less">
  .keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 225px;
    width: 100%;
    background: #ffffff;
    z-index: 999;

    .keyboard-head {
      width: 100%;
      height: 34px;
      line-height: 34px;
      color: #C5C5C5;

      .keyboard-title {
        padding-left: 12px;
        border-bottom: 1px solid #F5F5F5;
      }
      .keyboard-hide {
        width: 32px;
        height: 34px;
        padding: 5px;
        position: absolute;
        top: 0px;
        right: 5px;
        .hide-icon {
          display: block;
          width: 12px;
          height: 6px;
          background: url("/static/img/do.png");
          background-size: cover;
          margin: 10px auto;
        }
      }
    }

    .keyboard-content {
      width: 100%;
      .key-column-9 {
        width: 75%;
        height: 191px;
        float: left;

        .key-row {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          display: -webkit-flex;
          position: relative;
          height: 48px;
          line-height: 48px;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #f5f5f5;
          }

          .key-cell {
            -ms-flex: 1;
            flex: 1;
            -webkit-box-flex: 1;
            text-align: center;
            position: relative;
            &::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              overflow: hidden;
              height: 200%;
              border-right: 1px solid #f5f5f5;
              color: #f5f5f5;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scale(0.5);
              transform: scaleY(0.5);
            }

            .keyboard-done {
              position: relative;
              height: 48px;
              line-height: 48px;
              .keyboard-icon {
                display: block;
                width: 23px;
                height: 17px;
                background: url("/static/img/keyboard.png");
                background-size: cover;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -11px;
                margin-top: -8px;
              }
            }
          }
        }
      }
      .key-column-3 {
        width: 25%;
        height: 191px;
        float: left;

        .key-del {
          position: relative;
          height: 95px;
          line-height: 95px;

          .del-icon {
            display: block;
            width: 23px;
            height: 17px;
            background: url("/static/img/del.png");
            background-size: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -11px;
            margin-left: -9px;
          }
        }

        .key-confirm {
          position: relative;
          height: 96px;
          line-height: 96px;
          text-align: center;
          background: #FF823E;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }

  }

  /*.animated {*/
  /*animation-duration: .2s;*/
  /*animation-fill-mode: both;*/
  /*}*/

  @keyframes slideInDown {
    from {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 100%, 0);
      display: none;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slide-enter-active {
    /*animation-name: slideInUp;*/
    animation: slideInUp .2s;
  }

  .slide-leave-active {
    /*animation-name: slideInDown;*/
    animation: slideInDown .2s;
  }


</style>
