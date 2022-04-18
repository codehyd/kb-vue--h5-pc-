<template>
  <div>
    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageTable from "@/components/page-table";
import { ITableConfigType } from "@/base-ui/table";
// 网络请求
import {
  httpGetSalesDeliveryHeaderList,
  httpGetSalesDeliveryTableList,
} from "@/service/http/home/sales/delivery";
import type { ITableType } from "@/service/http/home/sales/delivery";

const props = withDefaults(
  defineProps<{
    requestData: ITableType;
  }>(),
  {}
);

const tableConfig: ITableConfigType = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
});

// const column = ref<any>([]);

// 请求表格头部数据
const requestHeader = async () => {
  const tableHeaderData = await httpGetSalesDeliveryHeaderList();
  tableConfig.column = tableHeaderData?.data?.[0]?.data ?? [];
  requestTable();
};

// 请求表格数据
const requestTable = async () => {
  const tableData = await httpGetSalesDeliveryTableList(props.requestData);
  tableConfig.data = tableData?.data?.[0]?.data ?? [];
};
requestHeader();
</script>

<style scoped></style>
