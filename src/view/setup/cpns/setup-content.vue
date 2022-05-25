<template>
  <div class="setup-content">
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane label="用户信息" name="first">
        <user-wrap></user-wrap>
        <notice-list></notice-list>
        <faq-wrap></faq-wrap>
      </el-tab-pane>
      <el-tab-pane label="配置信息" name="second">
        <set-wrap></set-wrap>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import UserWrap from "./user-wrap.vue";
import FaqWrap from "./faq-wrap.vue";
import SetWrap from "./set-wrap.vue";
import NoticeList from "./notice-list.vue";

const activeName = ref("first");
</script>

<style scoped>
.setup-content {
  width: 100%;
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
