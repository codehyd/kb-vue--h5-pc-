<template>
  <div class="good-search card">
    <page-search @query-click="handleQueryClick" :searchFormConfig="formConfig">
    </page-search>
    <div class="options">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";

const props = withDefaults(
  defineProps<{
    formConfig: any;
    tj?: string;
  }>(),
  {
    tj: "",
  }
);
const emit = defineEmits(["update:tj"]);

const handleQueryClick = (formData: any) => {
  emit("update:tj", formData.tj);
};
</script>

<style scoped>
.good-search {
  margin: 0 0 10px 0;
}
.options {
  display: flex;
  justify-content: flex-end;
}
</style>
