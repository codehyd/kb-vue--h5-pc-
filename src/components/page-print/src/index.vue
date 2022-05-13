<template>
  <div class="page-print">
    <kb-dialog :top="2" v-model:show="show">
      <iframe :style="{ height: '85vh', width: '100%' }" :src="url"></iframe>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
const props = withDefaults(
  defineProps<{
    url: string;
  }>(),
  {}
);
const show = ref(false);
defineExpose({
  show,
});
</script>

<style scoped></style>
