<template>
  <div class="main">
    <el-container>
      <el-header class="elHeader">
        <page-header></page-header>
      </el-header>
      <el-container class="content">
        <div class="aside" :style="{ width: currentFold ? '200px' : '0px' }">
          <page-menus></page-menus>
          <div
            v-elDrag="{
              scrollX: true,
              scrollY: true,
              onclick: handleFoldIconClick,
            }"
            class="flodIcon"
            :style="{ left: foldIcon ? '200px' : '0px' }"
          >
            123
            <!-- <kb-icon
              :name="foldIcon ? 'Fold' : 'Expand'"
              :size="22"
              flag="elIcon"
            ></kb-icon> -->
          </div>
        </div>

        <el-main class="elMain">
          <page-tabs></page-tabs>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      @close="foldIcon = false"
      v-model="isShowDrawer"
      :direction="'ltr'"
      :with-header="false"
    >
      <div style="width: 200px">
        <page-menus style="height: 100vh"></page-menus>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/page-header";
import PageMenus from "@/components/page-menus/src/page-menus.vue";
import PageTabs from "@/components/page-tabs";
import KbIcon from "@/base-ui/icon";

const currentFold = ref(true);
const isShowDrawer = ref(false);
const foldIcon = ref(true);

const handleFoldIconClick = () => {
  // 获取当前分辨率
  const width = document.body.clientWidth;
  if (width >= 992) {
    currentFold.value = !currentFold.value;
  } else {
    isShowDrawer.value = !isShowDrawer.value;
  }
  foldIcon.value = !foldIcon.value;
};
</script>

<style lang="less" scoped>
@import "./css/index.less";

.aside {
  position: relative;
  width: 200px;
  box-sizing: border-box;
  // 动画0.5s4
  transition: all 0.3s;
  height: calc(100vh - 60px);
}

.flodIcon {
  position: absolute;
  top: 60px;
  left: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 2px 0 8px #00000026;
  border-radius: 0 4px 4px 0;
  z-index: 100;
  transition: all 0.3s;
}

:deep(.el-drawer) {
  width: auto !important;
  background: linear-gradient(#485077, #333b5f);
}
:deep(.el-overlay .el-drawer__body) {
  padding: 0;
}
</style>
