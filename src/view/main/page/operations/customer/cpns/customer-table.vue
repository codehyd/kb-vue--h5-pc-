<template>
  <div class="card">
    <page-table :tableConfig="tableConfig"></page-table>
  </div>
</template>

<script setup lang="ts">
import pageTable from "@/components/page-table";
const props = withDefaults(
  defineProps<{
    data?: any[];
  }>(),
  {
    data: () => {
      return [];
    },
  }
);

const tableConfig = computed(() => {
  console.log(props.data);
  return {
    column: [
      {
        ffieldname: "fkhbianma",
        fshowname: "客户编码",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "fkhname",
        fshowname: "客户名称",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "ftotalqty",
        fshowname: "数量",
        fwidth: 200,
        falign: 0,
        fdatatype: "decimal",
      },
      {
        ffieldname: "frateqty",
        fshowname: "数量占比",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "ftotalamount",
        fshowname: "金额",
        fwidth: 200,
        fdatatype: "decimal",
        falign: 0,
      },
      {
        ffieldname: "frateamount",
        fshowname: "金额占比",
        fwidth: 200,
        falign: 0,
      },
    ],
    data: props.data,
    keyString: "",
    showAction: false,
  };
});
</script>

<style scoped></style>
