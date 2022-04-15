<template>
  <div class="tip-message">
    <kb-card :height="500">
      <template #title>
        <div class="title-content">
          <div class="title">{{ activeText }}...</div>
          <div class="actions">
            <el-dropdown @command="handleItemClick">
              <span class="el-dropdown-link">
                {{ activeText }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="item in activeList" :key="item.flag">
                    <el-dropdown-item :command="item">
                      {{ item.text }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
      <div class="content">
        <template
          v-for="(item, index) in billList"
          :key="index + ' ' + item.finterid"
        >
          <div class="listItem" @click="handleListClick(item)">
            <div class="title">
              <b class="select">{{ item.fbillname }}</b>
              <span>{{ item.fbillstatus }}</span>
            </div>
            <div class="info">
              <div>{{ item.fkhname }}</div>
              <div>{{ item.fbillno }}</div>
              <div>{{ item.fdate }}</div>
            </div>
          </div>
        </template>
        <template v-if="billList.length == 0">
          <div class="empty">
            <el-empty description="暂无数据" />
          </div>
        </template>
      </div>
    </kb-card>
  </div>
</template>

<script setup lang="ts">
import KbCard from "@/components/card";
import { activeList, IActiveListType } from "../config/billlist-config";
import { useStore } from "@/store";

const store = useStore();

const activeText = ref(activeList[0].text);

store.dispatch("home/getUserBillList", activeList[0].flag);
const billList = computed(() => store.state.home.billList);

const handleItemClick = (item: IActiveListType) => {
  activeText.value = item.text;
  store.dispatch("home/getUserBillList", item.flag);
};

const handleListClick = (item: any) => {
  console.log(item);
};
</script>

<style lang="less" scoped>
.tip-message {
  height: 500px;
}
.title-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .el-dropdown-link {
    cursor: pointer;
  }
}

.content {
  // background: pink;
  height: 100%;
  overflow-y: auto;
  .listItem {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    cursor: pointer;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
