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
        <div class="card good">
          <span class="select">客户信息</span>
          <page-form :formConfig="formConfig"></page-form>
        </div>
      </slot>
    </div>
    <edit-table-option @add-new-goods="handleAddNewGoods"></edit-table-option>
    <div class="card good">
      <span class="select">商品信息</span>
      <page-table ref="pageTableRef" :tableConfig="tableConfig"></page-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTable from "@/components/page-table";
import KbIcon from "@/base-ui/icon";
import EditTableOption from "./cpns/edit-table-options.vue";
import { ITableConfigType } from "@/base-ui/table";
import message from "@/utils/message";
import PageForm from "@/components/page-form";
import { IFormType } from "@/base-ui/form";

const props = withDefaults(
  defineProps<{
    title: string;
    tableConfig: ITableConfigType;
    formConfig: IFormType;
  }>(),
  {}
);

const emit = defineEmits(["goBack"]);

const pageTableRef = ref<InstanceType<typeof PageTable>>();

const handleGoBack = () => {
  emit("goBack");
};

const handleAddNewGoods = (row: any) => {
  pageTableRef.value?.insert(row);
  message.success("添加成功");
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
.good {
  padding: 10px;
}
</style>
