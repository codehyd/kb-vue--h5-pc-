<template>
  <div class="setup">
    <el-container>
      <el-header class="elHeader">
        <page-header></page-header>
      </el-header>
      <el-container>
        <el-aside class="elAside">
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import UserWrap from "./cpns/user-wrap.vue";
import SetWrap from "./cpns/set-wrap.vue";
import FaqWrap from "./cpns/faq-wrap.vue";
import PageHeader from "@/components/page-header";
import type { TabsPaneContext } from "element-plus";

// import useTabsHooks from "@/hooks/useTabsHoos";

// const { handleScroll } = useTabsHooks();

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

const mainRef = ref<HTMLElement>();

onMounted(() => {
  const main = mainRef.value;
  if (main) {
    // 监听滚动
    main.addEventListener("scroll", () => {
      // 获取所有子元素的高度并存放到数组里
      const children = Array.from(main.children) as HTMLElement[];
      const heights = children.map((item) => item.offsetHeight);
      // 获取当前滚动的距离
      const scrollTop = main.scrollTop;

      // 在滚动的时候n秒执行一次
      setTimeout(() => {
        // 判断当前滚动的距离是否大于等于所有子元素的高度
        if (scrollTop >= heights.reduce((a, b) => a + b)) {
          // 如果大于等于，则设置当前激活的tab为最后一个
          activeName.value = tabConfig[tabConfig.length - 1].name;
        } else {
          // 否则遍历所有子元素的高度，如果当前滚动的距离大于等于子元素的高度，则设置当前激活的tab为当前子元素的索引
          for (let i = 0; i < heights.length; i++) {
            if (scrollTop >= heights[i]) {
              activeName.value = tabConfig[i].name;
            }
          }
        }
      }, 500);
    });
  }
});
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
