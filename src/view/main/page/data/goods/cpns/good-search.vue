<template>
  <div class="good-search card">
    <page-search
      ref="pageFormRef"
      @query-click="handleQueryClick"
      :searchFormConfig="formConfig"
    ></page-search>
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
const emit = defineEmits(["query-click", "update:tj"]);

const pageFormRef = ref<InstanceType<typeof PageSearch>>();

const handleQueryClick = (formData: any) => {
  // emit("query-click", formData);
  emit("update:tj", formData.tj);
};

// defineExpose({
//   getCurrentFormData,
// });
</script>

<style scoped>
.good-search {
  margin-bottom: 20px;
}
.options {
  display: flex;
  justify-content: flex-end;
}
</style>
