<template>
  <div class="main">
    <el-container>
      <el-header class="elHeader">
        <page-header style="box-shadow: none"></page-header>
      </el-header>
      <el-container class="content">
        <div class="aside" :style="{ width: showMenu ? '200px' : '0px' }">
          <page-menus v-if="showMenu"></page-menus>
        </div>

        <el-main class="elMain">
          <page-tabs></page-tabs>
          <page-setup
            v-model:isFold="currentFoldFlag"
            @update:is-fold="handleFoldClick"
          ></page-setup>
          <div class="page-content">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-drawer
      @close="handleClose"
      v-model="showDrawerMenu"
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
import PageSetup from "@/components/page-setup";

const route = useRoute();
const animation = ref("slide");

const showMenu = ref(true);
const currentFoldFlag = ref(true);
const showDrawerMenu = ref(false);
onMounted(() => {
  // 获取当前分辨率
  const width = document.body.clientWidth;
  showMenu.value = width >= 1024 ? true : false;
  currentFoldFlag.value = width >= 1024 ? true : false;
  // 监听分辨率变化
  window.addEventListener("resize", () => {
    const width = document.body.clientWidth;
    showMenu.value = width >= 1024 ? true : false;
    currentFoldFlag.value = width >= 1024 ? true : false;
  });
  // showDrawerMenu.value = width >= 1024 ? false : true;
});

const handleFoldClick = () => {
  const width = document.body.clientWidth;
  if (width >= 1024) {
    showMenu.value = !showMenu.value;
  } else {
    showDrawerMenu.value = !showDrawerMenu.value;
  }
};
const handleFoldIconClick = () => {
  currentFoldFlag.value = !currentFoldFlag.value;
  // 获取当前分辨率
  const width = document.body.clientWidth;
  if (width >= 1024) {
    showMenu.value = !showMenu.value;
  } else {
    showDrawerMenu.value = !showDrawerMenu.value;
  }
};
const handleClose = () => {
  currentFoldFlag.value = !currentFoldFlag.value;
};

watch(route, () => {
  animation.value = route.meta.index == 1 ? "slide-right" : "slide-left";
});
</script>

<style lang="less" scoped>
@import "./css/index.less";

.aside {
  position: relative;
  width: 200px;
  box-sizing: border-box;
  // 动画0.5s4
  // transition: all 0.3s;
  height: calc(100vh - 60px);
}

:deep(.el-drawer) {
  width: auto !important;
  // background: linear-gradient(#485077, #333b5f);
}
:deep(.el-overlay .el-drawer__body) {
  padding: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  z-index: -1;
  backface-visibility: hidden;
}
.slide-right-enter-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-content {
  overflow: hidden;
  height: calc(100vh - 60px - 20px - 41px - 30px);
  overflow-y: auto;
}
</style>
