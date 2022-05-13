<template>
  <div class="card" style="margin: 10px 0 0 0">
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
  // console.log(props.data);
  return {
    column: [
      {
        ffieldname: "fcpbianma",
        fshowname: "产品编码",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "fcptiaoma",
        fshowname: "产品条码",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "fcpname",
        fshowname: "品牌/描述",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "fcpxinghao",
        fshowname: "产品名称",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "fcpguige",
        fshowname: "规格",
        fwidth: 200,
        falign: 0,
      },
      {
        ffieldname: "ftotalqty",
        fshowname: "数量",
        fwidth: 200,
        fdatatype: "decimal",
        falign: 0,
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
    loading: true,
  };
});
</script>

<style scoped></style>
