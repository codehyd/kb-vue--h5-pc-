<template>
  <div class="delivery">
    <template v-if="currentFlag == 'page'">
      <!-- 查询 -->
      <bild-query-content
        ref="bildQueryContentRef"
        :showColumnBilltypeid="1102"
        v-model:data="requestData"
        :searchConfig="searchConfig"
        @query-click="handleQueryClick"
        @toggle-click="currentFlag = 'edit'"
        :clientConfig="clientConfig"
      ></bild-query-content>
    </template>

    <template v-else>
      <!-- 编辑 -->
      <page-edit-table
        :billtypeid="103"
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
import { searchConfig } from "./config/bild-query-content";
import { clientConfig } from "./config/page-table-config";
// import BildSearch from "./cpns/bild-search.vue";
// import BildQueryTable from "./cpns/bild-query-table.vue";
import dayjs from "dayjs";
// import PageSearch from "@/components/page-search";
// import { formatDate } from "@/utils/timer";
// import { searchConfig } from "./config/search-config";
import SearchTable from "./cpns/search-table.vue";
import { PageEditTable, IEditTableConfig } from "@/components/page-table";
import type { ITableType } from "@/service/http/home/commit";
import useEditTable from "@/hooks/useEditTable";
import pageAddTablleConfig from "./config/page-addTable-config";
import { useStore } from "@/store";
import mitter from "@/mitt";

const store = useStore();

const bildQueryContentRef = ref<InstanceType<typeof BildQueryContent>>();

const searchTableRef = ref<InstanceType<typeof SearchTable>>();

const haaa = (data: any) => {
  console.log(requestData);
};
// 网络请求数据
const requestData: ITableType = reactive({
  page: 1,
  tj: "",
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
  billtypeid: 103,
});

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
    const res = await getEditTableAuth(103);
    editPageTableConfig.column = res?.data?.[0]?.data ?? [];
  }
});

const handleEditClick = async () => {
  const res = await getEditTableAuth(103);
  store.commit("bild/changeBilltypeid", 103);
  console.log(res);
  editPageTableConfig.column = res?.data?.[0]?.data ?? [];
  currentFlag.value = "edit";
};

const { bildFormConfig } = pageAddTablleConfig();

const handleQueryClick = (formData: any) => {
  requestData.tj = formData.tj;
  requestData.begdate = formData.begdate;
  requestData.enddate = formData.enddate;
  requestData.page = 1;
  bildQueryContentRef.value?.getTableData();
};

mitter.on("change-page", (val) => {
  requestData.page = val as number;
  searchTableRef.value?.requestTable();
});

const billtypeid = 103;
</script>

<style lang="less" scoped>
.active {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
