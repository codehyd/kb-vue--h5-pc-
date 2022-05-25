<template>
  <div class="page-menus">
    <el-menu
      :collapse-transition="false"
      active-text-color="#fff"
      unique-opened
      :background-color="'transparency'"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :default-active="defaultActive"
    >
      <template v-for="(menu, index) in menus" :key="menu.parent">
        <el-sub-menu :index="index + ''">
          <template #title>
            {{ menu.menuTitle }}
          </template>
          <template v-for="childMenu in menu.children">
            <el-menu-item
              @click="handlerClickMenu(childMenu)"
              :class="{ avtiveItem: menuIndex === childMenu.id + '' }"
              :index="childMenu.id + ''"
            >
              {{ childMenu.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { getMenuByParent } from "@/utils/mapMenus";

const store = useStore();
const router = useRouter();
const menus = computed(() => {
  const menus = store.state.login.classMenus;
  console.log("路由", menus);
  return menus;
});
const allMenus = computed(() => store.state.login.menus);

const menuIndex = ref("");
const activeIndex = ref<number>(0);

const defaultActive = ref("");
const defaultActiveId = ref("");

const handlerClickMenu = (item: any) => {
  defaultActiveId.value = "-1";
  menuIndex.value = item.id + "";
  router.push("/main" + item.path);
  // emit("menu-click");
};

const route = useRoute();

watch(
  () => route,
  (val: any) => {
    // console.log(val.meta, allMenus.value);
    menuIndex.value =
      allMenus.value.find((item: any) => item.title == val.meta.title)?.id +
        "" ?? "";
    const path = val.fullPath;

    defaultActive.value =
      allMenus.value.find((item: any) => "/main" + item.path == path)?.id + "";
  },
  {
    deep: true,
    immediate: true,
  }
);

const handleOpen = (params: any) => {
  activeIndex.value = params;
};
</script>

<style lang="less" scoped>
.page-menus {
  overflow: hidden;
  height: 100%;
  background: #eaf2fd;
  box-shadow: 2px 0 3px -1px rgb(0 0 0 / 12%);
  overflow-y: auto;
  .el-menu {
    border-right: none;
  }
}

:deep(.el-sub-menu__title),
:deep(.el-menu-item) {
  padding: 0 0px 0 0;
  &:hover {
    background-color: #f7f7f7;
  }
}

.avtiveItem {
  display: flex;
  justify-content: space-between;
  background-color: #fafbfd !important;
  color: #3779e6;
  border-radius: 30px 0 0 30px;
  margin: 0 0 0 10px;
  &::after {
    content: "";
    height: 100%;
    width: 6px;
    margin-right: 4px;
    background-color: #0094ff;
    margin: 0 14px 0 0;
  }
}
</style>
