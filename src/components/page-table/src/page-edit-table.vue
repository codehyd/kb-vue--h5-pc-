<template>
  <div class="page-edit-table">
    <!-- 页头 -->
    <el-page-header
      style="margin-bottom: 10px"
      :content="title"
      @back="handleGoBack"
    />
    <!-- 客户信息 -->
    <div class="current card">
      <div class="select">客户信息</div>
      <page-search
        ref="pageSearchRef"
        class="currentPageSearch"
        :searchFormConfig="formConfig"
      ></page-search>
    </div>
    <!-- 表格编辑 -->
    <div class="good card">
      <edit-table-option
        @save-bild="handleSaveBildClick"
        @add-new-goods="handleAddNewGoods"
      ></edit-table-option>
      <!-- <span class="select">商品信息</span> -->
      <page-table ref="pageTableRef" :tableConfig="tableConfig"></page-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch, { IForm } from "@/components/page-search";
import PageTable from "@/components/page-table";
import EditTableOption from "./cpns/edit-table-options.vue";

import { ITableConfigType } from "@/base-ui/table";
import message from "@/utils/message";
import { httpPostSave } from "@/service/http/home/commit";
import { useStore } from "@/store";
import base64 from "@/utils/base64";
import mitter from "@/mitt";

const props = withDefaults(
  defineProps<{
    title: string;
    tableConfig: ITableConfigType;
    formConfig: IForm;
    billtypeid: number;
  }>(),
  {}
);

const emit = defineEmits(["goBack"]);

const store = useStore();

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
    // 校验表格 true代表校验选中的行
    const tableData: any = await pageTableRef.value?.validate(true);
    if (tableData?.data) {
      // 获取表格数据后提交 post
      submitContent(
        formData,
        tableData.data.filter((item: any) => item.checked)
      );
    }
  }
};

function submitContent(currentInfo: any, tableData: any) {
  console.log(currentInfo, tableData, store.state.bild.currentInfo.fitemid);
  const content = base64.objToEncode({
    ...currentInfo,
    fcsid: store.state.bild.currentInfo.fitemid,
    data: tableData,
  });
  httpPostSave({
    billtypeid: 103,
    content,
  }).then((res) => {
    if (res.code >= 1) {
      message.confirm(
        "保存成功，是否继续添加商品？",
        () => {},
        () => {
          handleGoBack();
        }
      );

      // 删除打钩的数据
      mitter.emit("base-table-remove-select-rows");
    }

    message.show(
      res.code >= 1 ? `提交成功 单号为${res.billno}` : res.msg,
      res.type
    );
  });
}
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
