<template>
  <div class="good-list card">
    <el-tabs v-model="currentName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="item in clientListConfig.classList" :key="item.fclassid">
        <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>

    <page-table
      @db-click="handleDbClick"
      ref="pageTableRef"
      @page-change="handlePageChange"
      :tableConfig="clientListConfig"
    >
      <template #list>
        <client-list-item
          @detail-click="handleDetailClick"
          :data="clientListConfig.data"
        ></client-list-item>
      </template>
    </page-table>
  </div>
</template>

<script setup lang="ts">
import PageTable, { IClientTableConfig } from "@/components/page-table";
import ClientListItem from "./client-list-item.vue";
import { httpGetUserInfo } from "@/service/http/home/data";

const props = withDefaults(
  defineProps<{
    clientListConfig: IClientTableConfig;
  }>(),
  {}
);

const emit = defineEmits([
  "change-tabs",
  "change-page",
  "new-client",
  "edit-client",
]);
const pageTableRef = ref<InstanceType<typeof PageTable>>();

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
  pageTableRef.value!.currentFlag =
    pageTableRef.value?.currentFlag === "table" ? "list" : "table";
};

const handleClick = (params: any) => {
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

const handleNewAddGoods = () => {
  emit("new-client");
};

const handleDetailClick = async (data: any, index?: number) => {
  const res = await httpGetUserInfo({ id: data.fitemid });
  if (res.code >= 1) {
    emit("edit-client", res);
  }
};
const handleDbClick = (params: any) => {
  // emit("");
  console.log(params);
  const { row } = params;
  handleDetailClick(row);
};

defineExpose({
  handleToggleClick,
});
</script>

<style scoped>
.options {
  display: flex;
  justify-content: flex-end;
}
</style>
