<template>
  <div id="msgMy" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgCenter')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">我的消息</div>
      <div class="page-head-btn" @click="toComponent('msgMySend')">发送</div>
    </div>
    <div class="page-content">
      <div class="box-item" v-if="messages==''||messages.length==0">
        <p>暂无数据</p>
      </div>
      <cube-scroll
        ref="scroll"
        :data="messages"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        v-else>
        <div class="message-item" v-for="(item,index) in messages" v-bind:key="index">
          <div class="time">{{item.created_at}}</div>
          <div class="box-item">
            <div class="title">{{item.title}}</div>
            <div class="text">{{item.body}}</div>
            <div class="more" @click="lookDetail(item.id)">
              查看更多
              <div class="more-icon"></div>
            </div>
            <div class="news-tip" v-show="item.is_read===0">
              <i class="tip-icon"></i>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";
  import Socket from '../../../static/js/socket'

  export default {
    name: "msg-My",
    data() {
      return {
        user_id: getLocalStorage('user_id'),
        user_name: getLocalStorage('user_name'),
        session: getLocalStorage('session'),
        messages: [],

        currentPage: 1,//当前页码,
        pageSize: 5,//每页显示条数据

        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            thresholds: 20,
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了'
            }
          }
        }
      }
    },
    created() {
      this.initMsg();
      Socket.$on("message", this.handleMessage);
    },
    methods: {
      lookDetail(id) {
        Socket.send('{"cmd":"read","msg_id":"' + id + '"}');
        var _this = this;
        setTimeout(function () {
          _this.$root.Bus.$emit('toggleComponent', 'msgMyDetail')
        }, 50)
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      initMsg() {
        if (this.session == '' || this.session == undefined) {
          this.$router.push({path: '/login'})
        } else {
          this.$http
            .post(`${this.$api}/v1/userdata/r/user_info/${this.user_id}/${this.username}?session=${this.session}`)
            .then(res => {
              var resData = res.data;
              if (resData.success == true) {
                Socket.send('{"cmd":"page","page_index":' + this.currentPage + ',"page_size":' + this.pageSize + '}');
              } else {
                this.$router.push({path: '/login'})
              }
            })
            .catch(err => {
              this.$router.push({path: '/login'})
            })
        }
      },
      handleMessage(msg) {
        var msgSerialize = JSON.parse(msg);
        console.log('数据', msgSerialize);
        if (msgSerialize.list == undefined || msgSerialize == '') {
          if (msgSerialize.cmd === 'read') {
            setLocalStorage("myMsgDetail", JSON.stringify(msgSerialize));
          } else {
            var time = msgSerialize.created_at;
            msgSerialize.created_at = time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' +
              time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2);
            this.messages.unshift(msgSerialize);
          }
        } else {
          if (msgSerialize.list.length != 0) {
            this.messages = this.messages.concat(msgSerialize.list);
            this.currentPage = msgSerialize.page_index;
          } else {
            this.$refs.scroll.forceUpdate();
          }
        }
      },
      onPullingDown() {
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)
      },
      onPullingUp() {
        setTimeout(() => {
          const current = this.currentPage + 1;
          Socket.send('{"cmd":"page","page_index":' + current + ',"page_size":' + this.pageSize + '}');
        }, 500)
      }
    },
    beforeDestroy() {
      Socket.$off("message", this.handleMessage)
    }
  }
</script>

<style scoped>

</style>
