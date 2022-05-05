<template>
  <div class="hotGoods">
    <customer-search :searchConfig="customerSearchConfig"></customer-search>
    <customer-chart :config="customerSearchConfig"></customer-chart>
    <customer-table :data="data"></customer-table>
  </div>
</template>

<script setup lang="ts">
import CustomerSearch from "./cpns/customer-search.vue";
import { customerSearchConfig } from "./config/customer-search-config";
import { httpGetCustomerContributeData } from "@/service/http/home/operations";
import dayjs from "dayjs";
import customerChart from "./cpns/customer-chart.vue";
import customerTable from "./cpns/customer-table.vue";

const tableConfig = reactive({
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
});

const customerConfig = ref<any>({});
const data = ref<any>([]);

const getHotGoodsData = async () => {
  const res = await httpGetCustomerContributeData(tableConfig);
  customerConfig.value = res;
  data.value = res?.data?.[0]?.data;
};

getHotGoodsData();
</script>

<style scoped></style>
