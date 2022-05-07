<template>
  <div class="good-search card">
    <page-search
      @query-click="handleQueryClick"
      isShowQuery
      :searchFormConfig="formConfig"
    ></page-search>
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
</style>
