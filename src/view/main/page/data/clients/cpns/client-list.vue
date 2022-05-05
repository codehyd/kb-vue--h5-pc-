<template>
  <div class="good-list card">
    <div @click="handleToggleClick">12123</div>
    <el-tabs
      addable
      @tab-add="handleTabAddClick"
      v-model="currentName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <template v-for="item in clientListConfig.classList" :key="item.fclassid">
        <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>

    <template v-if="currentFlag == 'table'">
      <page-table
        @page-change="handlePageChange"
        :tableConfig="clientListConfig"
      ></page-table>
    </template>
    <template v-else>
      <client-list-item :data="clientListConfig.data"></client-list-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import PageTable, { IClientTableConfig } from "@/components/page-table";
import ClientListItem from "./client-list-item.vue";
const props = withDefaults(
  defineProps<{
    clientListConfig: IClientTableConfig;
  }>(),
  {}
);

const emit = defineEmits(["change-tabs", "change-page"]);

const currentFlag = ref<"list" | "table">("table");

const currentId = ref<number>(0);
const currentName = ref<string>("");

watch(
  () => props.clientListConfig.classList,
  (val) => {
    currentId.value = val[0]?.fclassid ?? 0;
    currentName.value = val[0]?.name ?? "";
  },
  {
    deep: true,
  }
);

const handleToggleClick = () => {
  currentFlag.value = currentFlag.value === "table" ? "list" : "table";
};

const handleClick = (params: any) => {
  // const { props } = params;
  currentName.value = params.props.name;
  currentId.value =
    props.clientListConfig?.classList?.find(
      (item: any) => item.name === params.props.name
    )?.fclassid ?? 0;

  emit("change-tabs", {
    name: currentName.value,
    id: currentId.value,
  });
};

const handlePageChange = (val: number) => {
  emit("change-page", val);
};

const handleTabAddClick = () => {
  console.log(123);
};
</script>

<style scoped></style>
