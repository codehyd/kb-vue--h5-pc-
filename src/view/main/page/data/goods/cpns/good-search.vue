<template>
  <div class="good-search card">
    <page-form isHasConfirm :formConfig="formConfig"></page-form>
  </div>
</template>

<script setup lang="ts">
import PageForm from "@/components/page-form";

const props = withDefaults(
  defineProps<{
    formConfig: any;
  }>(),
  {}
);
</script>

<style scoped>
.good-search {
  margin-bottom: 20px;
}
</style>
