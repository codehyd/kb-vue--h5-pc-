<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      @query-click="handleQueryClick"
      isShowQuery
      :searchFormConfig="searchConfig"
    ></page-search>

    <div class="card">
      <div class="options">
        <el-button @click="handleNewClick">新增收款单</el-button>
      </div>
      <page-table
        @page-change="handlePageChange"
        :billtypeid="104"
        :tableConfig="pageTableConfig"
      ></page-table>
    </div>

    <kb-dialog v-model:show="isShowPanel" title="新增销售收款单">
      <page-search
        ref="pageSearchRef"
        :searchFormConfig="bildFormConfig"
      ></page-search>
      <template #footer>
        <el-button @click="handleNewPanelQueryClick">保存提交</el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import { searchConfig, requestData } from "./config/search-config";
import PageTable from "@/components/page-table";
import { tableConfig } from "./config/table-config";
import RequestTable from "@/hooks/request-table";
import KbDialog from "@/base-ui/dialog";

import plusPanelConfig from "./config/plus-panel-config";
import message from "@/utils/message";
import base64 from "@/utils/base64";
import { httpPostSave } from "@/service/http/home/commit";

const store = useStore();
const { bildFormConfig } = plusPanelConfig();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const { column, data, totalPage, requestBildInfo } = RequestTable(
  104,
  "financeCollections",
  requestData.value
);

const pageTableConfig = computed(() => {
  return {
    ...tableConfig,
    column: column.value ?? [],
    data: data.value ?? [],
    page: requestData.value.page,
    totalPage: totalPage.value ?? 1,
  };
});

const handleQueryClick = (formData: any) => {
  requestData.value.tj = formData.tj;
  requestData.value.page = 1;
  requestData.value.begdate = formData.date[0];
  requestData.value.enddate = formData.date[1];
  requestBildInfo();
};

const handlePageChange = (val: number) => {
  requestData.value.page = val;
  requestBildInfo();
};

const isShowPanel = ref(false);
const handleNewClick = () => {
  isShowPanel.value = true;
};

const handleNewPanelQueryClick = async () => {
  const formData = (await pageSearchRef.value?.getFormData()) ?? {};
  if (!formData.fcsname) return message.show("请选择客户");
  const fcsid = store.state.bild.currentInfo.fitemid;
  const content = base64.objToEncode({ ...formData, fcsid });

  const res = await httpPostSave({ billtypeid: 104, content });
  message.show(res.msg, res.type);
  if (res.code >= 1) {
    isShowPanel.value = false;
    data.value = [...res.data[0].data, ...data.value];
  }
};
</script>

<style scoped>
.options {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
