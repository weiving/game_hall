<template>
  <div id="msgTypeList" class="page-wrap">
    <div class="page-head">
      <div class="toReturn" @click="toComponent('msgCenter')">
        <img src="/static/img/left.png" alt="">
      </div>
      <div class="title">{{noticeTitle}}</div>
    </div>
    <div class="page-content">
      <div class="unMessage" v-if="msgList.length==0">
        <div class="box-item">暂无公告</div>
      </div>
      <div class="message-item" v-for="(item,index) in msgList" v-bind:key="index">
        <div class="time">{{item.effected_at}}</div>
        <div class="box-item">
          <div class="title">{{item.title}}</div>
          <div class="text">{{item.content}}</div>
          <div class="more" @click="lookDetail(item.notice_id)">
            查看更多
            <div class="more-icon"></div>
          </div>
          <div class="news-tip">
            <i class="tip-icon"></i>
          </div>
          <!--<div class="news-tip" v-show="item.is_read===0">-->
          <!--<i class="tip-icon"></i>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage, getLocalStorage, removeLocalStorage} from "../../../static/js/util";

  export default {
    name: "msg-Type-List",
    data() {
      return {
        session: getLocalStorage('session'),
        user_id: getLocalStorage('user_id'),
        user_name: getLocalStorage('user_name'),
        noticeTitle: '',
        msgList: '',
      }
    },
    created() {
      this.getMsgList();
    },
    methods: {
      getMsgList() {
        this.noticeTitle = getLocalStorage('noticeTitle');

        var noticeType = getLocalStorage('noticeType');

        var params = new URLSearchParams();
        params.append('noticeType', noticeType);
        params.append('device', 1);

        this.$http
        //公告列表
        //.post(`/api/v1/notice/r/find_notice_list/${user_id}/${user_name}`, params)

        //首页公告-登陆
        //  .post(`/api/v1/notice/r/get_login_index_notice/${user_id}/${user_name}`)

        //首页公告-无需登陆
          .post(`/api/v1/notice/r/get_index_notice/1/1`)
          .then(res => {
            // console.log('公告列表', res.data);
            if (res.data.success == true) {
              // console.log('msgList', res.data.data)
              this.msgList = res.data.data;
            }
          })
      },
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
      lookDetail(notice_id) {
        setLocalStorage('notice_id', notice_id);
        this.$root.Bus.$emit('toggleComponent', 'msgTypeDetail')
      }
    },
    destroyed() {
      removeLocalStorage('noticeTitle');
      removeLocalStorage('noticeType')
    }
  }
</script>

<style scoped lang="less">
  #msgTypeList {
    .message-item {
      .time {
        margin-top: 20px;
        margin-bottom: 18px;
        text-align: center;
        color: #CDD0D4;
      }
      .box-item {
        padding: 12px 14px 0 14px;
        &.lookMore {
          max-height: none;
        }
        .title {
          color: #000000;
        }

        .text {
          margin-top: 10px;
          margin-bottom: 10px;
          color: #666666;
          line-height: 20px;
          overflow: hidden;
          font-size: 14px;
          &.lookMore {
            max-height: none;
          }
        }

        .more {
          display: block;
          border-top: 1px solid #EBEBEB;
          color: #9F9F9F;
          text-align: center;
          /*padding-top: 10px;*/
          height: 35px;
          line-height: 35px;
          position: relative;
          .more-icon {
            width: 12px;
            height: 6px;
            background: url("/static/img/do.png");
            background-size: cover;
            position: absolute;
            top: 14px;
            left: 61%;
          }
        }

        .news-tip {
          position: absolute;
          top: 0;
          right: 0;
          .tip-icon {
            display: block;
            width: 34px;
            height: 34px;
            background: url("/static/img/ico_tip.png");
            background-size: cover;
          }
        }
      }
    }
  }

</style>
