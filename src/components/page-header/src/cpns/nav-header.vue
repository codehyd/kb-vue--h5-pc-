<template>
  <div class="nav-header" v-if="isShowClass">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-if="navClassName">
        {{ navClassName }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ navRouteName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const store = useStore();
const classMenus = computed(() => store.state.login.classMenus);

const route = useRoute();

const navClassName = ref("");
const navRouteName = ref("");
watchEffect(() => {
  // 获取当前路由的类名
  const path = route.fullPath;

  if (path === "/main/home") {
    navRouteName.value = "首页";
    return;
  }

  const className = path.split("/")?.[2];
  const classRoute = classMenus.value?.find(
    (item: any) => item.parent === className
  );
  navClassName.value = classRoute?.menuTitle;

  // 获取当前路由的名称
  const routeName = path.split("/main")?.[1];
  const childRoute = classRoute?.children?.find(
    (item: any) => item.path === routeName
  );
  navRouteName.value = childRoute?.title;
});

const isShowClass = ref(false);

onMounted(() => {
  // 获取当前的窗口的宽度
  const width = window.innerWidth;
  isShowClass.value = width > 768 ? true : false;
  // 监听窗口变化
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    isShowClass.value = width > 768 ? true : false;
  });
});
</script>

<style scoped></style>
