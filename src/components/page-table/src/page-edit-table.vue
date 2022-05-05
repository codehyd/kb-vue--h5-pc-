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
        @reloadData="handleReloadData"
        @save-local-data="handleSaveLocalData"
        @load-new-data="handleLoadNewData"
        @remove-select-data="handleRemoveSelectData"
        @remove-all-data="handleRemoveAllData"
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
import useGetUserPrice from "@/hooks/useGetUserPrice";

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

const { changeGoodPrice } = useGetUserPrice();

const pageTableRef = ref<InstanceType<typeof PageTable>>();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const handleGoBack = () => {
  const fullData = pageTableRef.value?.getTableData()?.fullData ?? [];
  if (fullData.length > 0) {
    return message.confirm(
      "当前还有商品信息还未保存提交 是否缓存当前数据",
      () => {
        store.commit("bild/changeBildData", fullData);
        message.show("缓存成功", "success");
        emit("goBack");
      },
      () => {
        emit("goBack");
      }
    );
  }
  emit("goBack");
};

const handleAddNewGoods = async (row: any) => {
  const initColumn = pageTableRef.value?.getInitColumn() ?? {};
  const getPriceGoodRow = (await changeGoodPrice(row)) ?? {};
  const refRowData = Object.assign(initColumn, getPriceGoodRow);

  // // 先判断是否有空行
  const { fullData } = pageTableRef.value?.getTableData() ?? {};
  // 判断fullData的数组中是否有fmodelid字段 如果没有的话则拿到索引
  const index = fullData?.findIndex((item: any) => !item.fmodelid);
  if (index == -1) {
    pageTableRef.value?.insert(refRowData);
  } else {
    const newRow = [...(fullData ?? [])];
    newRow.splice(index!, 1, refRowData);
    pageTableRef.value?.reloadData(newRow);
  }
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

async function submitContent(currentInfo: any, tableData: any) {
  // console.log(currentInfo, tableData, store.state.bild.currentInfo.fitemid);
  const content = base64.objToEncode({
    ...currentInfo,
    fcsid: store.state.bild.currentInfo.fitemid,
    data: tableData,
  });
  const res = await httpPostSave({
    billtypeid: props.billtypeid,
    content,
  });
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
}

const handleLoadNewData = () => {
  pageTableRef.value?.loadingNewColumn();
};

const handleRemoveSelectData = () => {
  pageTableRef.value?.removeSelectData();
};

const handleRemoveAllData = () => {
  pageTableRef.value?.removeAllData();
};

const handleReloadData = (data: any) => {
  pageTableRef.value?.reloadData(data);
  message.show("加载成功", "success");
};
const handleSaveLocalData = () => {
  const fullData = pageTableRef.value?.getTableData()?.fullData ?? [];
  if (fullData.length == 0) return message.show("暂无数据缓存");
  store.commit("bild/changeBildData", fullData);
  message.show("缓存成功", "success");
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
