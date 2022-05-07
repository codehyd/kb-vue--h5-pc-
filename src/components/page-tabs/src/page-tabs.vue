<template>
  <div>
    <el-tabs
      v-if="allRouters.length > 0"
      v-model="activeName"
      type="card"
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
    if (title) {
      // 先判断是否存在
      const isExist = allRouters.value.find((item: any) => item.name === name);
      if (!isExist) {
        allRouters.value.push({ title, name });
      }
      activeName.value = name;
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
