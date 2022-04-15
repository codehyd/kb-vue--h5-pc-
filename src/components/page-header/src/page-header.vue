<template>
  <div class="page-header">
    <div class="logo">
      <img :src="logoSrc" alt="" />
    </div>

    <div class="content">
      <div>1</div>
      <div>21</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const logoSrc = ref("https://www.757abc.com/wxmp/img/weblogo.png");
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
