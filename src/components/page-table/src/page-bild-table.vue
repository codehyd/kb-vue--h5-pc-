<template>
  <div class="page-bild-table">
    <page-table
      :tableConfig="tableConfig"
      :tableActiveConfig="tableActiveConfig"
      @on-detail="handleMenuClickDetail"
      @on-active-detail="handleActiveClickDetail"
    ></page-table>
  </div>
</template>

<script setup lang="ts">
import { ITableConfigType } from "@/base-ui/table";
import {} from "@/service/http/home/sales/delivery";

import PageTable, { ITableActiveConfigType } from "@/components/page-table";
const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfigType;
    tableActiveConfig?: ITableActiveConfigType[];
    bildType: number;
  }>(),
  {
    tableActiveConfig: () => [],
  }
);

const emit = defineEmits(["on-menu-detail", "on-active-detail"]);
const handleMenuClickDetail = (params: any) => {
  emit("on-menu-detail", params);
};

const handleActiveClickDetail = (params: any) => {
  emit("on-active-detail", params);
};
</script>

<style scoped></style>
