<template>
  <div class="bild-query-table card">
    <!-- 查询表格 -->
    <page-table
      :tableConfig="queryTableConfig"
      :tableActiveConfig="queryTableActiveConfig"
    ></page-table>
  </div>
</template>

<script setup lang="ts">
import { ITableConfigType } from "@/base-ui/table";
import PageTable from "@/components/page-table";
import {
  queryTableMenusConfig,
  queryTableActiveConfig,
} from "../config/page-table-config";

import queryTableHooks from "@/hooks/query-table-hooks";

// 单据类型
const billtypeid = 103;

// 查询表格配置
const queryTableConfig: ITableConfigType = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  menuConfig: queryTableMenusConfig,
  loading: true,
  isShowPage: true,
  page: 1,
  totalPage: 1,
});

// 网络请求数据

const {} = queryTableHooks();
</script>

<style scoped></style>
