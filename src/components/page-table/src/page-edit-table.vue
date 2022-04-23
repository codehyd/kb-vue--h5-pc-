<template>
  <div class="page-edit-table">
    <div class="table-header">
      <span class="goBack">
        <kb-icon
          @click="handleGoBack"
          flag="elIcon"
          name="ArrowLeftBold"
          text="返回"
        ></kb-icon>
        <el-divider direction="vertical" />

        当前: {{ title }}
      </span>
      <slot name="header">
        <span class="select">客户信息</span>
      </slot>
    </div>
    <span class="select">商品信息</span>

    <edit-table-option @add-new-goods="handleAddNewGoods"></edit-table-option>

    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageTable from "@/components/page-table";
import KbIcon from "@/base-ui/icon";
import EditTableOption from "./cpns/edit-table-options.vue";
import { ITableConfigType } from "@/base-ui/table";

const props = withDefaults(
  defineProps<{
    title: string;
    tableConfig: ITableConfigType;
  }>(),
  {}
);

const emit = defineEmits(["goBack"]);

const handleGoBack = () => {
  emit("goBack");
};

const handleAddNewGoods = (row: any) => {
  console.log(row);
};
</script>

<style scoped>
.goBack {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #e8eaec;
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
}
</style>
