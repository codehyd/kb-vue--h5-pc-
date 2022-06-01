<template>
  <div class="custorm-list">
    <kb-card :height="350">
      <template #title>
        <div class="title">
          <span>我的工作台</span>
          <div>
            <span @click="handleReset" class="setting">重置</span>
            <span @click="handleSetting" class="setting">设置</span>
          </div>
        </div>
      </template>
      <div class="content">
        <el-row :gutter="20">
          <template v-for="item in userMenus">
            <el-col v-bind="colStyle">
              <div @click="handleMenuItemClick(item)" class="item">
                <img :src="item.icon" alt="" />
                <span>{{ item.title }}</span>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </kb-card>

    <kb-dialog
      isBeforeClose
      @beforeClose="handleClone"
      v-model:show="isShowSettingPanel"
    >
      <b class="select" style="--selectBg: #0094ff">我的应用</b>
      <div class="allCurrentList">
        <template v-for="item in newCurrentList" :key="'current' + item.id">
          <div
            class="item"
            style="--badgeText: '删除'; --badgeBgColor: red"
            :class="{ badge: isEditFlag }"
            @click="handleDelete(item)"
          >
            <img :src="item.icon" alt="" />
            <span>{{ item.title }}</span>
          </div>
        </template>
      </div>
      <b class="select" style="--selectBg: #0094ff">全部应用</b>
      <div class="allClassMenus">
        <template
          v-for="(item, index) in classMenusList"
          :key="'class' + item.parent"
        >
          <span class="select">{{ item.menuTitle }}</span>
          <div class="allCurrentList">
            <template
              v-for="(childrenItem, index) in item.children"
              :key="'childrenItem' + childrenItem.id"
            >
              <div
                class="item"
                :class="{ badge: isEditFlag }"
                style="--badgeText: '增加'"
                @click="handleAdd(childrenItem)"
              >
                <img :src="childrenItem.icon" alt="" />
                <span>{{ childrenItem.title }}</span>
              </div>
            </template>
          </div>
        </template>
      </div>
      <template #footer>
        <el-button type="primary" @click="handleSettingCustormList">
          {{ !isEditFlag ? "编辑" : "完成" }}
        </el-button>
        <el-button type="primary" @click="handleClone">关闭</el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbCard from "@/components/card";
import KbDialog from "@/base-ui/dialog";
import { useStore } from "@/store";
import message from "@/utils/message";

const router = useRouter();
const store = useStore();
const userMenus = computed(() => store.state.custormList);

const colStyle = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
};

// 点击重置
const handleReset = () => {
  const defaultMenus = store.state.login.menus;
  // 获取defaultMenus前8个
  const menus = defaultMenus.slice(0, 8);
  store.dispatch("setCustormList", menus);
};

const isShowSettingPanel = ref(false);
const newCurrentList: any = ref([]);
const classMenusList: any = ref([]);

// 点击设置
const handleSetting = () => {
  isShowSettingPanel.value = true;
  newCurrentList.value = [...userMenus.value];
  classMenusList.value = store.state.login.classMenus;
  console.log(classMenusList.value);
};

const isEditFlag = ref(false);
const handleSettingCustormList = () => {
  if (isEditFlag.value) {
    store.dispatch("setCustormList", newCurrentList.value);
    isEditFlag.value = false;
  } else {
    isEditFlag.value = true;
  }
};

// 点击删除
const handleDelete = (item: any) => {
  if (isEditFlag.value) {
    const index = newCurrentList.value.findIndex(
      (menu: any) => menu.id === item.id
    );
    newCurrentList.value.splice(index, 1);
  }
};

// 点击增加
const handleAdd = (item: any) => {
  console.log(item);
  if (isEditFlag.value) {
    // 判断是否增加 如果没有则增加 如果有则提示
    const index = newCurrentList.value.findIndex(
      (menu: any) => menu.id === item.id
    );
    if (index === -1) {
      newCurrentList.value.push(item);
    } else {
      message.show(`(${item.title})已经添加过了`);
    }
  }
};

// 点击关闭
const handleClone = (done?: any) => {
  if (isEditFlag.value) {
    message.show("请先保存");
    return;
  }
  isShowSettingPanel.value = false;
  if (done) {
    done && done();
  }
};

const handleMenuItemClick = (item: any) => {
  router.push("/main" + item.path);
};
</script>

<style lang="less" scoped>
.custorm-list {
  height: 350px;
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .setting {
      display: inline-flex;
      margin: 0 0 0 20px;
      color: #409eff;
      cursor: pointer;
    }
  }
  .content {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
        border-radius: 8px;
      }
      span {
        margin-top: 5px;
        font-weight: 600;
      }
    }
  }

  .allCurrentList {
    display: flex;
    padding: 10px 20px;
    flex-wrap: wrap;

    .item {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      margin-right: 20px;
      margin-bottom: 10px;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .allClassMenus {
    padding: 10px 20px;
  }
}
</style>
