<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap-image">
        <img src="https://v.dianlan8.com/img/login.c0627fcb.webp" alt="" />
      </div>
      <div class="login-wrap-content">
        <login-box></login-box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginBox from "./cpns/login-box.vue";
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
