<template>
  <div class="pagination">
    <span>每页显示{{ count }}条数据</span>
    <el-pagination
      :current-page="currentPageModelValue"
      :page-count="totalPage"
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const props = withDefaults(
  defineProps<{
    totalPage: number;
    currentPage?: number;
  }>(),
  {}
);

const emit = defineEmits(["page-change", "update:currentPage"]);

const store = useStore();

const currentPageModelValue = computed({
  get: () => props.currentPage,
  set: (val) => {
    emit("update:currentPage", val);
  },
});

const count = computed(() => {
  const count =
    store.state.setup.config?.["pc-table"]?.setup?.find(
      (item: any) => item.id === "count"
    )?.value ?? 10;
  return count;
});

const handleCurrentPage = (val: number) => {
  emit("page-change", val);
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
