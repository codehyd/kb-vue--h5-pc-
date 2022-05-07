<template>
  <div>
    <page-search
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
      isShowQuery
    ></page-search>
    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import dayjs from "dayjs";
import PageTable, { IHasTimerOrTj } from "@/components/page-table";
import { httpGetStockData } from "@/service/http/home/operations";

const tableConfig: IHasTimerOrTj = reactive({
  keyString: "",
  column: [
    {
      ffieldname: "fbianma",
      fshowname: "编码",
      fwidth: 120,
      falign: 0,
    },
    {
      ffieldname: "ftiaoma",
      fshowname: "条码",
      fwidth: 120,
      falign: 0,
    },
    {
      ffieldname: "fname",
      fshowname: "品牌/描述",
      fwidth: 120,
      falign: 1,
    },
    {
      ffieldname: "fxinghao",
      fshowname: "产品名称",
      fwidth: 120,
      falign: 1,
    },
    {
      ffieldname: "fguige",
      fshowname: "规格",
      fwidth: 120,
      falign: 1,
    },
    {
      ffieldname: "funit",
      fshowname: "产品单位",
      fwidth: 120,
      falign: 1,
    },
    {
      ffieldname: "fqty_sqjc",
      fshowname: "上期结存",
      fwidth: 120,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "fqty_bqsr",
      fshowname: "本期收入",
      fwidth: 120,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "fqty_bqfc",
      fshowname: "本期发出",
      fwidth: 120,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "fqty_bqjc",
      fshowname: "本期结存",
      fwidth: 120,
      falign: 1,
      fdatatype: "decimal",
    },
  ],
  data: [],
  tj: "",
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
  showAction: false,
  loading: true,
});

const getOrderData = () => {
  httpGetStockData({
    tj: tableConfig.tj,
    begdate: tableConfig.begdate,
    enddate: tableConfig.enddate,
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};

const handleQueryClick = (formData: any) => {
  httpGetStockData({
    tj: formData.tj,
    begdate: formData.date[0],
    enddate: formData.date[1],
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
getOrderData();
</script>

<style scoped></style>
