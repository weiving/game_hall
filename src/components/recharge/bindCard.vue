<template>
  <div id="bindCard" class="page-wrap">
    <div class="page-head">
      <router-link to="/" class="toReturn">
        <img src="/static/img/left.png" alt="">
      </router-link>
      <div class="title">绑定银行卡</div>
    </div>
    <div class="page-content">
      <div class="info-title">请输入您的身份信息</div>
      <div class="info-box">
        <div class="info-item">
          <span>真实姓名</span>
          <input type="text" class="" value="罗麟">
        </div>
        <div class="info-item">
          <span>身份证号</span>
          <input type="text" class="" value="894131653254913156464">
        </div>
      </div>
      <div class="info-title">请输入您的银行卡信息 <div class="tips"><i class="icon"></i>支持银行及限额</div></div>
      <div class="info-box">
        <div class="info-item">
          <span>银行卡号</span>
          <input type="text" class="" value="6548 4234 5431 2151">
        </div>
        <div class="info-item">
          招商银行
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <div class="info-item">
          <span>开户地区</span>
          <input type="text" class="" value="罗麟">
          <div class="next-side">
            <i class="wind-icon"></i>
          </div>
        </div>
        <div class="info-item">
          <span>手机号</span>
          <input type="text" class="" value="15461234564">
        </div>
        <div class="info-item">
          <span>短信验证</span>
          <input type="text" class="" value="" placeholder="输入短信验证码">
          <div class="get-code">获取验证码</div>
        </div>
      </div>
      <div class="default-btn">确认绑定</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bind-card"
  }
</script>

<style scoped>

</style>
