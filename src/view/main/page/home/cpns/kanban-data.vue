<template>
  <div class="kanban-data card" v-if="isShowKanbanDataPanel">
    <el-radio-group
      class="options"
      v-model="options"
      @change="handleRadioChange"
    >
      <template v-for="item in optionConfig" :key="item.flag">
        <el-radio :label="item.flag" size="large">{{ item.text }}</el-radio>
      </template>
    </el-radio-group>

    <line-charts v-bind="lineChartOption"></line-charts>
  </div>
</template>

<script setup lang="ts">
import { LineCharts } from "@/components/page-charts";
import { useStore } from "@/store";

import { optionConfig } from "../config/kanban-data-config";

const store = useStore();
store.dispatch("home/getKanbanData");

const kanbanData = computed(() => store.state.home.kanbanData);
const isShowKanbanDataPanel = computed(() =>
  store.state.home.kanbanData.code >= 1 ? true : false
);

// 折线图配置
const lineChartOption = computed(() => {
  // const kanbanData = store.state.home.kanbanData;
  isShowKanbanDataPanel.value;
  const values = kanbanData.value?.series ?? [];
  return {
    title: "日趋势销售图",
    xLabels: kanbanData.value?.xaxis4x ?? [],
    values: values.map((item: any) => {
      const newItem = Object.assign({}, item);
      newItem.smooth = true;
      return newItem;
    }),
  };
});

const options = ref("month");
const handleRadioChange = (value: string) => {
  // 获取对应的数据date
  const date = optionConfig.find((item: any) => item.flag === value)?.getDate;
  store.dispatch("home/getKanbanData", {
    begdate: date!()?.[0],
    enddate: date!()?.[1],
  });
};
</script>

<style lang="less" scoped>
.kanban-data {
  margin-bottom: 10px;
  padding: 10px;

  .options {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
