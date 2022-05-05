<template>
  <div>
    <bar-charts
      title="热销单品"
      :xLabels="xLabels"
      :values="series"
    ></bar-charts>
  </div>
</template>

<script setup lang="ts">
import { BarCharts } from "@/components/page-charts";

const props = withDefaults(
  defineProps<{
    config: any;
  }>(),
  {}
);

const xLabels = computed(() => {
  return props.config?.xaxis4x ?? [];
});

const series = computed(() => {
  return props.config?.series ?? [];
});
</script>

<style scoped></style>
