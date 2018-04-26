<template>
  <div id="sendPacket" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('packetManage')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">发送红包</div>
    </div>
    <div class="page-content">
      <div class="box-item">
        <label class="col-xs-4">红包金额</label>
        <div class="con-xs-8 text-right">
          <input type="text" class="text-right" placeholder="0.00">
          <span>元</span>
        </div>
      </div>
      <div class="box-item">
        <label class="col-xs-4">红包个数</label>
        <div class="con-xs-8 text-right">
          <input type="text" class="text-right" placeholder="填写个数">
          <span>个</span>
        </div>
      </div>
      <div class="box-item">
        <label class="col-xs-4">接受对象</label>
        <div class="con-xs-8 text-right">
          <div class="toLower">
            <label for="toLower">直属下级</label>
            <input type="radio" id="toLower" name="lower">
            <div class="user-defined active">
              <span class="circle active"></span>
            </div>
          </div>
          <div class="allLower">
            <label for="allLower">全部下级</label>
            <input type="radio" id="allLower" name="lower">
            <div class="user-defined">
              <span class="circle active"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-item">
        <textarea name=""  rows="3" cols="10" placeholder="恭喜发财"></textarea>
      </div>
      <div class="box-amount"><span>￥</span><span class="amount">4889</span></div>
      <div class="default-btn">确认</div>
      <p class="help-tips">红包金额至少10，红包个数最低为10个。累计发红包越多，抢红包获得的金额越大</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "send-packet",
    data() {
      return {}
    },
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    },
  }
</script>

<style scoped lang="less">
  #sendPacket {
    .page-content {
      .toLower, .allLower {
        position: relative;
        height: 20px;
        line-height: 20px;
        margin-left: 24px;
        display: inline-block;
        label {
          display: block;
          height: 20px;
          width: 75px;
          line-height: 20px;
          cursor: pointer;
        }
        input {
          z-index: 3;
          display: block;
          opacity: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          left: -24px;
          margin: auto;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .user-defined {
          z-index: 2;
          position: absolute;
          top: 0;
          bottom: 0;
          left: -24px;
          margin: auto;
          width: 24px;
          height: 24px;
          border: 1px solid #BEBEBE;
          border-radius: 50%;
          cursor: pointer;

          span.circle {
            display: block;
            width: 16px;
            height: 16px;
            margin-top: 3px;
            margin-left: 3px;
            background-color: transparent;
            border-radius: 50%;
          }

          &.active {
            border-color: #FF7F00;
            span {
              background-color: #FF7F00;
            }
          }
        }
      }

      .box-item {
        textarea {
          width: 100%;
          height: 100%;
        }
      }

      .box-amount {
        margin-top: 30px;
        text-align: center;
        .amount {
          font-size: 30px;
          font-weight: 500;
        }
      }

      .help-tips {
        width: 90vw;
        margin: 15px 5vw 0 5vw;
        color: #CED1D3;
      }
    }
  }
</style>
