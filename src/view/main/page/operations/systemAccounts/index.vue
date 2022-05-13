<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
      isShowQuery
    ></page-search>

    <page-table class="card" :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import dayjs from "dayjs";
import PageTable, { IHasTimerOrTj } from "@/components/page-table";
import { httpGetPayableData } from "@/service/http/home/operations";

const tableConfig: IHasTimerOrTj = reactive({
  keyString: "",
  column: [
    {
      ffieldname: "fkhbianma",
      fshowname: "供应商编码",
      fwidth: 200,
      falign: -1,
    },
    {
      ffieldname: "FCSNAME",
      fshowname: "供应商名称",
      fwidth: 200,
      falign: -1,
    },
    {
      ffieldname: "FAMOUNT_SHANGQI",
      fshowname: "上期余额",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "FAMOUNT_RUKU",
      fshowname: "期间应付款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "FAMOUNT_TUIHUO",
      fshowname: "期间应退款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "FAMOUNT_FUKUAN",
      fshowname: "期间付款",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "FAMOUNT_TOTAL",
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
  httpGetPayableData({
    tj: tableConfig.tj,
    begdate: tableConfig.begdate,
    enddate: tableConfig.enddate,
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};

const handleQueryClick = (formData: any) => {
  httpGetPayableData({
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
