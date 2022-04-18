<template>
  <div>
    <base-table v-bind="tableConfig"></base-table>
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
</script>

<style scoped></style>
