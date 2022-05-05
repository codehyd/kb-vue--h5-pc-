<template>
  <div class="good-list card">
    <div class="options">
      <el-button @click="handleToggleClick">切换显示样式</el-button>
      <el-button @click="handleNewAddGoods">新增商品资料</el-button>
    </div>
    <el-tabs
      addable
      @tab-add="handleTabAddClick"
      v-model="currentName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <template v-for="item in goodListConfig.classList" :key="item.fclassid">
        <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>

    <page-table
      ref="pageTableRef"
      @page-change="handlePageChange"
      :tableConfig="goodListConfig"
    >
      <template #list>
        <good-list-item
          @edit-good="handleEditGood"
          :data="goodListConfig.data"
        ></good-list-item>
      </template>
    </page-table>
  </div>
</template>

<script setup lang="ts">
import PageTable, { IGoodTableConfig } from "@/components/page-table";
import GoodListItem from "./good-list-item.vue";
import { httpGetGoodsInfo } from "@/service/http/home/data";
const props = withDefaults(
  defineProps<{
    goodListConfig: IGoodTableConfig;
  }>(),
  {}
);

const emit = defineEmits([
  "change-tabs",
  "change-page",
  "new-goods",
  "edit-good",
]);
const pageTableRef = ref<InstanceType<typeof PageTable>>();

const currentFlag = ref<"list" | "table">("table");

const currentId = ref<number>(0);
const currentName = ref<string>("");

watch(
  () => props.goodListConfig.classList,
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
  // const { props } = params;
  currentName.value = params.props.name;
  currentId.value =
    props.goodListConfig?.classList?.find(
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
  emit("new-goods");
};

const handleTabAddClick = () => {
  console.log(123);
};

const handleEditGood = async (data: any) => {
  const res = await httpGetGoodsInfo({ id: data.item.fmodelid });
  if (res.code >= 1) {
    emit("edit-good", res.data[0].data[0]);
  }
};
</script>

<style scoped>
.options {
  display: flex;
  justify-content: flex-end;
}
</style>
