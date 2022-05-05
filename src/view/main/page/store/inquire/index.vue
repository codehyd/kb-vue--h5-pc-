<template>
  <div class="inquire">
    <inquire-search :searchConfig="inquireSearchConfig"></inquire-search>
    <inquire-table :tableConfig="tableConfig"></inquire-table>
  </div>
</template>

<script setup lang="ts">
import InquireSearch from "./cpns/inquire-search.vue";
import { inquireSearchConfig } from "./config/inquire-search-config";
import { IStoreinquireConfig } from "@/components/page-table";

import InquireTable from "./cpns/inquire-table.vue";

import requestTable from "@/hooks/request-table";

const tableConfig: IStoreinquireConfig = reactive({
  classid: 0,
  page: 1,
  keyString: "",
  showAction: false,
  isShowPage: true,
  totalPage: 1,
});
const { column, data, totalPage } = requestTable(
  1307,
  "storeInquire",
  tableConfig
);
watchEffect(() => {
  tableConfig.column = column.value ?? [];
  tableConfig.data = data.value ?? [];
  tableConfig.totalPage = totalPage.value ?? 1;
});
</script>

<style scoped></style>
