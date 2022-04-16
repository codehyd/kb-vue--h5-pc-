<template>
  <el-popover :trigger="trigger"> </el-popover>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    trigger?: "click" | "hover" | "focus" | "contextmenu";
  }>(),
  {
    trigger: "hover",
  }
);
</script>

<style scoped></style>
