<template>
  <div class="main">
    <el-container>
      <el-header class="elHeader">
        <page-header></page-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <page-menus></page-menus>
        </el-aside>
        <el-main class="elMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/page-header";
import PageMenus from "@/components/page-menus/src/page-menus.vue";
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
