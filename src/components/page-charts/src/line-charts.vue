<template>
  <div class="line-charts">
    <kb-echarts :options="options"></kb-echarts>
  </div>
</template>

<script setup lang="ts">
import KbEcharts from "@/base-ui/echarts";
const props = withDefaults(
  defineProps<{
    title?: string;
    xLabels: string[] | any[];
    values: any[];
    isRadius?: boolean;
  }>(),
  {
    title: "",
    isRadius: true,
  }
);
const options = computed(() => {
  const series = [...props.values].map((item) => {
    const newItem = Object.assign({}, item);
    newItem.smooth = props.isRadius;
    return newItem;
  });
  return {
    title: {
      text: props.title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series,
  };
});
</script>

<style scoped></style>
