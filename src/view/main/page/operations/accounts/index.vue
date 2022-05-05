<template>
  <div>
    <page-search :searchFormConfig="searchConfig" isShowQuery></page-search>
    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import dayjs from "dayjs";
import PageTable, { IHasTimerOrTj } from "@/components/page-table";
import { httpGetReceivableData } from "@/service/http/home/operations";

const tableConfig: IHasTimerOrTj = reactive({
  keyString: "",
  column: [
    {
      ffieldname: "fcsbianma",
      fshowname: "客户编码",
      fwidth: 200,
      falign: -1,
    },
    {
      ffieldname: "fcsname",
      fshowname: "客户名称",
      fwidth: 200,
      falign: -1,
    },
    {
      ffieldname: "famount_shangqi",
      fshowname: "上期余额",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount_chuku",
      fshowname: "期间应收款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount_tuihuo",
      fshowname: "期间应退款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount_shoukuan",
      fshowname: "期间收款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "famount_total",
      fshowname: "本期余额",
      fwidth: 200,
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
  httpGetReceivableData({
    tj: tableConfig.tj,
    begdate: tableConfig.begdate,
    enddate: tableConfig.enddate,
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
getOrderData();
</script>

<style scoped></style>
