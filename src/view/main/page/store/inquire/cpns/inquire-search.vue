<template>
  <div class="inquire-search card">
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
