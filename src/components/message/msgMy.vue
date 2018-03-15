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
      <div class="box-item" v-if="messages.length==0">
        <p>暂无数据</p>
      </div>
      <div class="pagination-wrap">
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
</template>

<script>
  // import {setLocalStorage, getLocalStorage, abc_WebSocket} from "../../../static/js/util";
  import {setLocalStorage, getLocalStorage} from "../../../static/js/util";
  import Socket from '../../socket'
  import pagination from '../common/pagination'

  export default {
    name: "msg-My",
    data() {
      return {
        user_id: "",
        messages: [],

        currentPage: 1,//当前页码,
        pages: 1,
        pageSize: 5,//每页显示条数据
        total: 0,//总记录数
      }
    },
    created() {
      this.initMsg();
      Socket.$on("message", this.handleMessage)
    },
    methods: {
      lookDetail(id) {
        // this.sendMessage('{"cmd":"read","msg_id":"' + id + '"}');
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
        Socket.send('{"cmd":"page","page_index":' + this.currentPage + ',"page_size":' + this.pageSize + '}');
      },
      handleMessage(msg) {
        var msgSerialize = JSON.parse(msg);
        console.log('msgSerialize', msgSerialize)
        if (msgSerialize.list == undefined || msgSerialize == '') {
          if (msgSerialize.cmd === 'read') {
            setLocalStorage("myMsgDetail", JSON.stringify(msgSerialize));
          } else {
            var time = msgSerialize.created_at;
            msgSerialize.created_at = time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' +
              time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2);
            console.log('created_at', msgSerialize.created_at);
            this.messages.unshift(msgSerialize);
          }
        } else {
          this.messages = msgSerialize.list;
          this.currentPage = msgSerialize.page_index;
          this.pages = msgSerialize.pages;
          this.pageSize = msgSerialize.page_size;
          this.total = msgSerialize.total;
        }
      },

      //从page组件传递过来的当前page
      pageChange(page) {
        this.currentPage = page;
        this.initMsg();
      },
    },
    components: {
      pagination
    },
    beforeDestroy() {
      Socket.$off("message", this.handleMessage)
    }
  }
</script>

<style scoped>

</style>
