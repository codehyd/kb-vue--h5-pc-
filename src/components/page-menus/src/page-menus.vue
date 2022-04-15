<template>
  <div class="page-menus">
    <el-menu
      :collapse-transition="false"
      text-color="#fff"
      active-text-color="#caaeae"
      unique-opened
      :background-color="'transparency'"
      class="el-menu-vertical-demo"
    >
      <template v-for="(menu, index) in menus" :key="menu.parent">
        <el-sub-menu :index="index + ''">
          <template #title>
            <!-- {{ isFold ? menu.menuTitle : menu.menuTitle[0] }} -->
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
const menus = computed(() => store.state.login.classMenus);

const menuIndex = ref("");
const defaultActiveId = ref("");

const handlerClickMenu = (item: any) => {
  defaultActiveId.value = "-1";
  menuIndex.value = item.id + "";
  router.push("/main" + item.path);
  // emit("menu-click");
};
</script>

<style lang="less" scoped>
.page-menus {
  overflow: hidden;
  height: calc(100vh - 60px);
  background: #3b4368;
  overflow-y: auto;
  .el-menu {
    border-right: none;
  }
}
</style>
