<template>
  <div class="page-edit-table">
    <div class="current card">
      <div class="select">客户信息</div>
      <page-search
        ref="pageSearchRef"
        class="currentPageSearch"
        :searchFormConfig="formConfig"
      ></page-search>
    </div>

    <div class="good card">
      <edit-table-option
        @save-bild="handleSaveBildClick"
        @add-new-goods="handleAddNewGoods"
      ></edit-table-option>
      <span class="select">商品信息</span>
      <page-table ref="pageTableRef" :tableConfig="tableConfig"></page-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch, { IForm } from "@/components/page-search";
import PageTable from "@/components/page-table";
import KbIcon from "@/base-ui/icon";
import EditTableOption from "./cpns/edit-table-options.vue";
import { ITableConfigType } from "@/base-ui/table";
import message from "@/utils/message";
// import PageForm from "@/components/page-form";
import { IFormType } from "@/base-ui/form";
import CurrentInfo from "./cpns/current-info.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    tableConfig: ITableConfigType;
    formConfig: IForm;
  }>(),
  {}
);

const emit = defineEmits(["goBack"]);

const pageTableRef = ref<InstanceType<typeof PageTable>>();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const handleGoBack = () => {
  emit("goBack");
};

const handleAddNewGoods = (row: any) => {
  pageTableRef.value?.insert(row);
  message.success("添加成功");
};

// 保存提交
const handleSaveBildClick = async () => {
  // 先校验表单
  const formData = await pageSearchRef.value?.getFormData();
  if (formData) {
    // 校验表格
    const tableData: any = await pageTableRef.value?.validate();
    if (tableData?.data) {
      // 获取表格数据后提交 post
    }
  }
};
</script>

<style lang="less" scoped>
.current {
  padding: 10px;
  margin: 0 0 10px 0;
  .currentPageSearch {
    &:deep(.el-form-item__content) {
      border: 1px solid #ebeef5;
      margin: 0px -1px;
    }
    &:deep(.el-form-item__label) {
      background-color: #f5f7fa;
      border: 1px solid #ebeef5;
    }
    &:deep(.el-input__inner) {
      border: none;
      box-shadow: none;
    }
  }
}

.good {
  padding: 10px;
}
</style>
