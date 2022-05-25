<template>
  <div class="barcode">
    <template v-if="!card">
      <img id="barcode" />
    </template>
    <template v-else>
      <el-popover
        @after-enter="hanndleShowPopover"
        title="条形码"
        :width="400"
        placement="top"
        trigger="hover"
      >
        <img ref="imageElRef" id="barcodeCard" />
        <p>{{ barcode }}</p>
        <template #reference>
          <span>{{ barcode }}</span>
        </template>
      </el-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
import JsBarcode from "jsbarcode";
const props = withDefaults(
  defineProps<{
    barcode?: string;
    height?: number;
    card: boolean;
  }>(),
  {
    height: 40,
    card: false,
  }
);

const imageElRef = ref<HTMLElement>();

const refBarCode = (id: any) => {
  if (!props.barcode) return;
  nextTick(() => {
    JsBarcode(id, props.barcode!, {
      format: "CODE128",
      lineColor: "#000",
      width: 2,
      height: props.height,
      displayValue: false,
    });
  });
};

const hanndleShowPopover = () => {
  refBarCode(imageElRef.value);
};

watchEffect(() => {
  if (props.barcode && !props.card) {
    refBarCode("barcode");
  }
});
</script>

<style scoped>
.barcode {
  display: inline-flex;
  cursor: pointer;
}
</style>
