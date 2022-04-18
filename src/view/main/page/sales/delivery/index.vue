<template>
  <div class="delivery">
    <PageForm isHasConfirm :formConfig="searchConfig"></PageForm>
    <search-table :requestData="requestData"></search-table>
  </div>
</template>

<script setup lang="ts">
import PageForm from "@/components/page-form";
import { searchConfig } from "./config/search-config";
import SearchTable from "./cpns/search-table.vue";

import type { ITableType } from "@/service/http/home/sales/delivery";

const requestData: ITableType = reactive({
  page: 1,
  tj: "",
  begdate: "2022-04-01",
  enddate: "2022-04-30",
  billtypeid: 103,
});
</script>

<style lang="less" scoped></style>
