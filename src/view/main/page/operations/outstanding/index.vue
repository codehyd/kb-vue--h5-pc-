<template>
  <div>
    <page-search
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>

    <bar-charts :xLabels="xLabels" :values="values">
      <template #right>
        <ranking-cpn :list="tableConfig.data"></ranking-cpn>
      </template>
    </bar-charts>

    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import PageTable from "@/components/page-table";
import { BarCharts } from "@/components/page-charts";
import { httpGetAchievementData } from "@/service/http/home/operations";
import { ITableConfigType } from "@/base-ui/table/type";
import RankingCpn from "./cpns/ranking.vue";

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

const xLabels = ref([]);
const values = ref([]);

const tableConfig: ITableConfigType = reactive({
  keyString: "",
  loading: true,
  showAction: false,
  column: [
    {
      ffieldname: "fyewuyuan",
      fshowname: "业务员",
      fwidth: 200,
      falign: 0,
    },

    {
      ffieldname: "ftotalqty",
      fshowname: "数量",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "frateqty",
      fshowname: "数量占比",
      fwidth: 200,
      falign: 1,
    },
    {
      ffieldname: "ftotalamount",
      fshowname: "金额",
      fwidth: 200,
      falign: 1,
      fdatatype: "decimal",
    },
    {
      ffieldname: "frateamount",
      fshowname: "金额占比",
      fwidth: 200,
      falign: 1,
    },
  ],
});

const getRankingData = () => {
  httpGetAchievementData(requestData).then((res) => {
    tableConfig.data = res?.data?.[0]?.data ?? [];
    xLabels.value = res?.xaxis4x ?? [];
    values.value = res?.series ?? [];
  });
};

getRankingData();
</script>

<style scoped></style>
