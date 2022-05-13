<template>
  <div class="page-menus">
    <el-menu
      :collapse-transition="false"
      text-color="#fff"
      active-text-color="#caaeae"
      unique-opened
      :background-color="'transparency'"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :default-active="defaultActive"
    >
      <template v-for="(menu, index) in menus" :key="menu.parent">
        <el-sub-menu :index="index + ''">
          <template #title>
            <!-- {{ isFold ? menu.menuTitle : menu.menuTitle[0] }} -->
            <div
              :class="activeIndex == index ? 'select' : ''"
              style="--selectBg: white"
            >
              {{ menu.menuTitle }}
            </div>
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
const menus = computed(() => store.state.login.classMenus);
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
  background: #3b4368;
  overflow-y: auto;
  .el-menu {
    border-right: none;
  }
}
</style>
