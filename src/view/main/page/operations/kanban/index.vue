<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>

    <kanban-data
      class="card"
      style="margin: 0 0 10px 0"
      :data="kanbanData"
    ></kanban-data>

    <line-charts class="card" :xLabels="xLabels" :values="values"></line-charts>
    <!-- <bar-charts :xLabels="xLabels" :values="values"> </bar-charts> -->
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import { LineCharts } from "@/components/page-charts";
import { httpGetOperationsData } from "@/service/http/home/operations";
import KanbanData from "./cpns/kanban-data.vue";
import dayjs from "dayjs";

const requestData = reactive({
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
});

const handleQueryClick = (formData: any) => {
  requestData.begdate = formData.date[0];
  requestData.enddate = formData.date[1];
  getKanbanData();
};

const xLabels = ref([]);
const values = ref([]);
const kanbanData = ref([]);

const getKanbanData = () => {
  httpGetOperationsData(requestData).then((res) => {
    xLabels.value = res?.xaxis4x ?? [];
    values.value = res?.series ?? [];
    kanbanData.value = res?.data?.[0]?.data?.[0] ?? [];
  });
};

getKanbanData();
</script>

<style scoped></style>
