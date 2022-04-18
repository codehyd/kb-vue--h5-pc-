<template>
  <div class="setup">
    <page-header class="pageHeader"></page-header>
  </div>
</template>

<script setup lang="ts">
import UserWrap from "./cpns/user-wrap.vue";
import SetWrap from "./cpns/set-wrap.vue";
import FaqWrap from "./cpns/faq-wrap.vue";
import PageHeader from "@/components/page-header";
import type { TabsPaneContext } from "element-plus";

const handleScrolll = () => {
  console.log(1);
};

const tabConfig = [
  {
    label: "我的信息",
    name: "user",
  },
  {
    label: "相关设置",
    name: "setting",
  },
  {
    label: "常见问题",
    name: "faq",
  },
];

const activeName = ref(tabConfig[0].name);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};
</script>

<style lang="less" scoped>
.setup {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: pink;
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
