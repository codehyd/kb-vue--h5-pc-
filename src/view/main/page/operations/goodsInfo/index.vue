<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>

    <page-table class="card" :tableConfig="tableConfig" @expand="handleExpand">
      <template #tableContent="{ row }">
        <h2>{{ row.fcpname }} {{ row.fcpxinghao }} {{ row.fcpguige }}</h2>
        <page-table :tableConfig="detailTableConfig"></page-table>
      </template>
    </page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";

import PageTable from "@/components/page-table";
import { ITableConfigType } from "@/base-ui/table";

import {
  httpGetGoodsCountData,
  httpGetGoodsCountDetailData,
} from "@/service/http/home/operations";

const requestData = reactive({
  tj: "",
  begdate: searchConfig?.formItems?.[1]?.defaultDateValue?.[0] ?? "",
  enddate: searchConfig?.formItems?.[1]?.defaultDateValue?.[1] ?? "",
});

const handleQueryClick = (formData: any) => {
  requestData.tj = formData.tj;
  requestData.begdate = formData.date[0];
  requestData.enddate = formData.date[1];
  getTableData();
};

const tableConfig: ITableConfigType = reactive({
  keyString: "",
  column: [
    {
      ffieldname: "fcpbianma",
      fshowname: "产品编码",
      fwidth: 200,
      falign: 0,
    },
    {
      ffieldname: "fcptiaoma",
      fshowname: "产品条码",
      fwidth: 200,
      falign: 0,
    },
    {
      ffieldname: "fcpname",
      fshowname: "品牌/描述",
      fwidth: 200,
      falign: 0,
    },
    {
      ffieldname: "fcpxinghao",
      fshowname: "产品名称",
      fwidth: 200,
    },
    {
      ffieldname: "fcpguige",
      fshowname: "规格",
      fwidth: 200,
      falign: 0,
    },
    {
      ffieldname: "fqty",
      fshowname: "总数量",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount",
      fshowname: "总金额",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
  ],
  showAction: false,
  showExpand: true,
  loading: true,
});

const detailTableConfig: ITableConfigType = reactive({
  keyString: "",
  loading: true,
  showAction: false,
  column: [
    {
      ffieldname: "fkhbianma",
      fshowname: "客户编码",
      fwidth: 200,
      falign: 0,
    },
    {
      ffieldname: "fkhname",
      fshowname: "客户名称",
      fwidth: 200,
      falign: 0,
    },

    {
      ffieldname: "fqty",
      fshowname: "数量",
      fwidth: 200,
      falign: 0,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount",
      fshowname: "金额",
      fwidth: 200,
      falign: 0,
      fdatatype: "decimal",
    },
  ],
});

const getTableData = () => {
  httpGetGoodsCountData(requestData).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
getTableData();

const handleExpand = (row: any) => {
  const data = {
    modelid: row.fmodelid,
    begdate: requestData.begdate,
    enddate: requestData.enddate,
  };
  httpGetGoodsCountDetailData(data).then((res) => {
    detailTableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
</script>

<style scoped></style>
