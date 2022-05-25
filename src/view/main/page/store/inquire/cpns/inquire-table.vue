<template>
  <div class="inquire-table card">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="item in classList" :key="item.fclassid">
        <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>
    <page-table
      @page-change="handlePageChange"
      :tableConfig="tableConfig"
    ></page-table>
  </div>
</template>

<script setup lang="ts">
import { httpGetGoodsClassList } from "@/service/http/home/commit";
import PageTable, { IStoreinquireConfig } from "@/components/page-table";

const props = withDefaults(
  defineProps<{
    tableConfig: IStoreinquireConfig;
  }>(),
  {}
);

const emit = defineEmits(["tab-click", "page-change"]);

const activeName = ref("");
const classList = ref<any[]>([]);
httpGetGoodsClassList().then((res) => {
  classList.value = res?.data?.[0]?.data;
  activeName.value = classList.value?.[0]?.name ?? "";
});

const handleClick = (tab: any, event: Event) => {
  // const name = tab.props.name;
  emit(
    "tab-click",
    classList.value?.find((item) => item.name === tab.props.name)?.fclassid ?? 0
  );
};

const handlePageChange = (val: number) => {
  emit("page-change", val);
};
</script>

<style scoped></style>
