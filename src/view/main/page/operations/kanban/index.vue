<template>
  <div>
    <page-search
      isShowQuery
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
    ></page-search>
    <kanban-data :data="kanbanData"></kanban-data>
    <line-charts :xLabels="xLabels" :values="values"></line-charts>
    <!-- <bar-charts :xLabels="xLabels" :values="values"> </bar-charts> -->
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import { LineCharts } from "@/components/page-charts";
import { httpGetOperationsData } from "@/service/http/home/operations";
import KanbanData from "./cpns/kanban-data.vue";

const requestData = reactive({
  begdate: searchConfig?.formItems?.[1]?.defaultDateValue?.[0] ?? "",
  enddate: searchConfig?.formItems?.[1]?.defaultDateValue?.[1] ?? "",
});

const handleQueryClick = (formData: any) => {
  requestData.begdate = formData.date[0];
  requestData.enddate = formData.date[1];
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
