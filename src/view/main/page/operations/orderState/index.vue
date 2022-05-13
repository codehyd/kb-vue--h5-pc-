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
import { httpGetOrderTraceData } from "@/service/http/home/operations";

const tableConfig: IHasTimerOrTj = reactive({
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
      ffieldname: "forderqty",
      fshowname: "订单量",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "fleftqty",
      fshowname: "未发货",
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
  httpGetOrderTraceData({
    tj: tableConfig.tj,
    begdate: tableConfig.begdate,
    enddate: tableConfig.enddate,
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
getOrderData();

const handleQueryClick = (formData: any) => {
  httpGetOrderTraceData({
    tj: formData.tj,
    begdate: formData.date[0],
    enddate: formData.date[1],
  }).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
  });
};
</script>

<style scoped></style>
