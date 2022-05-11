<template>
  <div class="setup">
    <el-container>
      <el-header class="elHeader">
        <page-header></page-header>
      </el-header>
      <el-container>
        <setup-content></setup-content>

        <!-- 123 -->
        <!-- <el-aside class="elAside">
          <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
            <el-tab-pane label="User"></el-tab-pane>
            <el-tab-pane label="Config"></el-tab-pane>
            <el-tab-pane label="Role"></el-tab-pane>
            <el-tab-pane label="Task"></el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main class="elMain">
          <div ref="mainRef">
            <user-wrap></user-wrap>
            <set-wrap></set-wrap>
            <faq-wrap></faq-wrap>
          </div>
        </el-main> -->
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import UserWrap from "./cpns/user-wrap.vue";
import SetWrap from "./cpns/set-wrap.vue";
import FaqWrap from "./cpns/faq-wrap.vue";
import PageHeader from "@/components/page-header";
import SetupContent from "./cpns/setup-content.vue";
import type { TabsPaneContext } from "element-plus";

// import useTabsHooks from "@/hooks/useTabsHoos";

// const { handleScroll } = useTabsHooks();

// const tabConfig = [
//   {
//     label: "我的信息",
//     name: "user",
//   },
//   {
//     label: "相关设置",
//     name: "setting",
//   },
//   {
//     label: "常见问题",
//     name: "faq",
//   },
// ];

// const activeName = ref(tabConfig[0].name);
</script>

<style lang="less" scoped>
.setup {
  height: 100vh;
  overflow: hidden;
  .elHeader {
    margin: 0;
    padding: 0;
  }
  .elAside {
    margin: 10px 0 0 0;
    width: auto;
  }
  .elMain {
    overflow-y: auto;
    height: calc(100vh - 60px);
  }
}

.el-tabs {
  // position: sticky;
  // top: 48px;
  height: calc(100% - 48px - 20px);
  padding: 0px 20px 20px;
  overflow: hidden;
  z-index: 99;
  background-color: white;
}
.tabWrap {
  height: calc(100% - 48px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
