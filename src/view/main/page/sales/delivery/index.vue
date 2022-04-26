<template>
  <div class="delivery">
    <!-- 查询 -->
    <template v-if="currentFlag == 'page'">
      <page-search :searchFormConfig="bildFormConfig"></page-search>
      <!-- <PageForm isHasConfirm :formConfig="searchConfig"></PageForm> -->
      <div class="active">
        <el-button @click="handleEditClick" icon="plus">添加</el-button>
      </div>
      <search-table :requestData="requestData"></search-table>
    </template>

    <!-- 编辑 -->
    <template v-else>
      <page-edit-table
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
import PageSearch from "@/components/page-search";
import PageForm from "@/components/page-form";
import { searchConfig } from "./config/search-config";
import SearchTable from "./cpns/search-table.vue";
import { PageEditTable, IEditTableConfig } from "@/components/page-table";
import type { ITableType } from "@/service/http/home/sales/delivery";
import useEditTable from "@/hooks/useEditTable";
import pageAddTablleConfig from "./config/page-addTable-config";
import { useStore } from "@/store";

const store = useStore();

const requestData: ITableType = reactive({
  page: 1,
  tj: "",
  begdate: "2022-04-01",
  enddate: "2022-04-30",
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
</script>

<style lang="less" scoped>
.active {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
