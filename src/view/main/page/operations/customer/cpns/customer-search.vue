<template>
  <div class="hotGoods-searach">
    <page-search :searchFormConfig="searchConfig" isShowQuery></page-search>
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
</script>

<style scoped></style>
