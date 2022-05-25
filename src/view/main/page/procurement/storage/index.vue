<template>
  <div class="delivery">
    <template v-if="currentFlag == 'page'">
      <!-- 查询 -->
      <bild-query-content
        v-model:data="requestData"
        ref="bildQueryContentRef"
        :showColumnBilltypeid="1202"
        :searchConfig="searchConfig"
        :tableConfig="tableConfig"
        :detailTablConfig="detailTableConfig"
        :billtypeid="requestData.billtypeid"
        @query-click="handleQueryClick"
        @toggle-click="currentFlag = 'edit'"
        @another-click="handleAnotherClick"
      ></bild-query-content>
    </template>

    <template v-else>
      <!-- 编辑 -->
      <page-edit-table
        :billtypeid="requestData.billtypeid"
        :formConfig="bildFormConfig"
        :tableConfig="editPageTableConfig"
        @goBack="currentFlag = 'page'"
        title="销售送货单开单编辑"
        ref="pageEditTable"
      ></page-edit-table>
    </template>
  </div>
</template>

<script setup lang="ts">
import BildQueryContent from "@/components/bild-query-content";
import {
  searchConfig,
  tableConfig,
  detailTableConfig,
} from "./config/bild-query-content";
import dayjs from "dayjs";
import { PageEditTable, IEditTableConfig } from "@/components/page-table";
import type { ITableType } from "@/service/http/home/commit";
import useEditTable from "@/hooks/useEditTable";
import pageAddTablleConfig from "./config/page-addTable-config";
import { useStore } from "@/store";

const store = useStore();
const bildQueryContentRef = ref<InstanceType<typeof BildQueryContent>>();

// 网络请求数据
const requestData: ITableType = reactive({
  page: 1,
  tj: "",
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
  billtypeid: 112,
});

// 查询
const handleQueryClick = (formData: any) => {
  requestData.tj = formData.tj;
  requestData.begdate = formData.begdate;
  requestData.enddate = formData.enddate;
  // requestData.page = 1;
  requestData.page = formData.page ?? 1;
  bildQueryContentRef.value?.getTableData();
};

const editPageTableConfig: IEditTableConfig = reactive({
  keyString: "fitemid",
  column: [],
  state: "edit",
  showIndex: true,
  showAction: false,
});

const { getEditTableAuth } = useEditTable();
const currentFlag = ref<"edit" | "page">("page");

watchEffect(async () => {
  if (currentFlag.value === "edit") {
    const res = await getEditTableAuth(requestData.billtypeid);
    editPageTableConfig.column = res?.data?.[0]?.data ?? [];
  } else {
    const begdate = requestData.begdate;
    const enddate = requestData.enddate;
    searchConfig.searchFormConfig.formItems[1].defaultDateValue = [
      begdate,
      enddate,
    ];
  }
});

const handleAnotherClick = (rows: any) => {
  currentFlag.value = "edit";
  store.commit("bild/changeBildData", rows);
};

const { bildFormConfig } = pageAddTablleConfig();
</script>

<style lang="less" scoped>
.active {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
