<template>
  <div class="hotGoods">
    <hot-goods-search :searchConfig="hotGoodsSearchConfig"></hot-goods-search>
    <hot-goods-chart :config="hotGoodsConfig"></hot-goods-chart>
    <hot-goods-table :data="data"></hot-goods-table>
  </div>
</template>

<script setup lang="ts">
import HotGoodsSearch from "./cpns/hotGoods-search.vue";
import { hotGoodsSearchConfig } from "./config/hotGoods-search-config";
import { httpGetHotGoodsData } from "@/service/http/home/operations";
import dayjs from "dayjs";
import HotGoodsChart from "./cpns/hotGoods-chart.vue";
import HotGoodsTable from "./cpns/hotGoods-table.vue";

const tableConfig = reactive({
  begdate: dayjs().startOf("month").format("YYYY-MM-DD"),
  enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
});

const hotGoodsConfig = ref<any>({});
const data = ref<any>([]);

const getHotGoodsData = async () => {
  const res = await httpGetHotGoodsData(tableConfig);
  hotGoodsConfig.value = res;
  data.value = res?.data?.[0]?.data;
};

getHotGoodsData();
</script>

<style scoped></style>
