<template>
  <div class="pageTabs">
    <el-tabs
      v-if="allRouters.length > 0"
      v-model="activeName"
      type="card"
      closable
      @tab-remove="handleTabRemove"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <template v-for="item in allRouters" :key="item.name">
        <el-tab-pane :label="item.title" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { TabsPaneContext } from "element-plus";

const route = useRoute();
const router = useRouter();

const allRouters = ref<any[]>([]);

const activeName = ref("");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, allRouters.value);
  const currentRouteName = route.name;
  if (currentRouteName !== activeName.value) {
    router.push({ name: activeName.value });
  }
};

watch(
  () => route,
  (val: any) => {
    // const { title } = val.meta.value as any;
    const title = val.meta.title;
    const name = val.name;

    // console.log(121, val);

    if (title && name) {
      // 先判断是否存在
      const isExist = allRouters.value.find((item: any) => item.name === name);
      if (!isExist) {
        allRouters.value.push({ title, name });
      }
    }
    activeName.value = name ?? "";
  },
  {
    deep: true,
    immediate: true,
  }
);

const handleTabRemove = (name: any) => {
  // 1. 删除路由
  const index = allRouters.value.findIndex((item: any) => item.name === name);
  if (index > -1) {
    allRouters.value.splice(index, 1);
  }
  // 2. 删除自己
  if (name == activeName.value) {
    const nextRoute = allRouters.value[index - 1] || allRouters.value[index];
    if (nextRoute) {
      activeName.value = nextRoute.name;
      router.push({ name: nextRoute.name });
    }
  }
  // 3. 删除全部
  if (allRouters.value.length === 0) {
    router.push({ name: "home" });
  }
};
</script>

<style scoped>
.pageTabs {
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 999;
  margin: 0 0 10px 0;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

:deep(.el-tabs .el-tabs__content) {
  display: none;
}

:deep(.el-tabs__nav-scroll) {
  overflow-x: auto;
}
</style>
