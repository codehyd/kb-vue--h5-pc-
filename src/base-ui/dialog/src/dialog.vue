<template>
  <div>
    <el-dialog v-model="isShowPanel"> </el-dialog>
  </div>
</template>

<script name="KbDialog" setup lang="ts">
const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {}
);

const emit = defineEmits(["update:show"]);

const isShowPanel = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});
</script>

<style lang="less" scoped></style>
