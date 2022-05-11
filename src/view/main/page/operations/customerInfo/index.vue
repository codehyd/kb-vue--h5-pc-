<template>
  <div>
    <page-search
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>

    <page-table :tableConfig="tableConfig" @expand="handleExpand">
      <template #tableContent="{ row }">
        <h2>{{ row.fkhname }}</h2>
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
  httpGetCustomerCountData,
  httpGetCustomerCountDetailData,
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
};

const tableConfig: ITableConfigType = reactive({
  keyString: "",
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
});

const detailTableConfig: ITableConfigType = reactive({
  keyString: "",
  loading: true,
  showAction: false,
  column: [
    {
      ffieldname: "fcpbianma",
      fshowname: "编码",
      fwidth: 200,
      falign: -1,
    },
    {
      ffieldname: "fcptiaoma",
      fshowname: "条码",
      fwidth: 200,
      falign: -1,
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
      falign: 0,
    },
    {
      ffieldname: "fcpguige",
      fshowname: "规格",
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
  httpGetCustomerCountData(requestData).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
getTableData();

const handleExpand = (row: any) => {
  const data = {
    csid: row.fcsid,
    begdate: requestData.begdate,
    enddate: requestData.enddate,
  };
  httpGetCustomerCountDetailData(data).then((res) => {
    detailTableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
</script>

<style scoped></style>
