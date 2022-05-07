<template>
  <div class="hotGoods-searach">
    <page-search
      @query-click="handleQueryClick"
      :searchFormConfig="searchConfig"
      isShowQuery
    ></page-search>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import { IForm } from "@/base-ui/base-form";
const props = withDefaults(
  defineProps<{
    searchConfig: IForm;
  }>(),
  {}
);

const emit = defineEmits(["query-click"]);
const handleQueryClick = (formData: any) => {
  emit("query-click", formData);
};
</script>

<style scoped></style>
