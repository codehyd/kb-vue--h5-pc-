<template>
  <div class="bild-search card">
    <h2>销售送货单</h2>
    <page-search
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "../config/search-config";

// 监听查询事件
const handleQueryClick = (formData: any) => {
  console.log(formData);
};
</script>

<style scoped></style>
