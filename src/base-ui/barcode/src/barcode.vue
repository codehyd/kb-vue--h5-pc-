<template>
  <div>
    <img id="barcode" />
  </div>
</template>

<script setup lang="ts">
import JsBarcode from "jsbarcode";
const props = withDefaults(
  defineProps<{
    barcode: string;
    height: number;
  }>(),
  {}
);

watchEffect(() => {
  if (props.barcode) {
    nextTick(() => {
      JsBarcode("#barcode", props.barcode, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: props.height,
        displayValue: false,
      });
    });
  }
});
</script>

<style scoped></style>
