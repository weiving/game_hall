<template>
  <div class="header">
    <div class="header-info">
      <img src="/static/img/head.png" alt="头像">
      <div class="h-center">
        <div class="unAgentUser" v-if="user_type==1">
          <div class="name-row">
            <div class="username">{{username}}</div>
            <div class="vip">普通会员</div>
          </div>
          <div class="uid-row">
            UID:<span class="code">{{user_id}}</span>
          </div>
        </div>
        <div class="agentUser" v-else>
          <div class="name-row">
            <div class="username">{{username}}</div>
          </div>
          <div class="uid-row">
            UID:<span class="code">{{user_id}}</span>
          </div>
          <div class="user-status">
            <div class="small-button active">代理</div>
            <div class="small-button">离线</div>
            <div class="small-button active">正常</div>
          </div>
        </div>
      </div>
      <div class="toMySet" @click="toComponent('mySet')">
        <div class="more-page"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-header",
    props: ['username', 'user_id', 'user_type'],
    methods: {
      toComponent(component) {
        this.$root.Bus.$emit('toggleComponent', component)
      },
    }
  }
</script>

<style scoped lang="less">


</style>
