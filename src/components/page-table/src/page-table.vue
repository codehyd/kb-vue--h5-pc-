<template>
  <div>
    <base-table v-bind="autoTableConfig"></base-table>
  </div>
</template>

<script setup lang="ts">
import BaseTable, { ITableConfigType } from "@/base-ui/table";
const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfigType;
  }>(),
  {}
);

const autoTableConfig = computed(() => props.tableConfig);
</script>

<style scoped></style>
