<template>
  <div class="good-list card">
    <el-tabs v-model="currentName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="item in goodListConfig.classList" :key="item.fclassid">
        <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
      </template>
    </el-tabs>

    <page-table
      cardPanel
      ref="pageTableRef"
      @db-click="handleDbClick"
      @page-change="handlePageChange"
      :tableConfig="goodListConfig"
    >
      <template #list="{ data }">
        <good-list-item
          @edit-good="handleEditGood"
          :data="data"
        ></good-list-item>
      </template>
    </page-table>
  </div>
</template>

<script setup lang="ts">
import PageTable, { IGoodTableConfig } from "@/components/page-table";
import GoodListItem from "./good-list-item.vue";
import { httpGetGoodsInfo } from "@/service/http/home/data";
import message from "@/utils/message";
const props = withDefaults(
  defineProps<{
    goodListConfig: IGoodTableConfig;
  }>(),
  {}
);

const emit = defineEmits(["change-tabs", "change-page", "edit-good"]);

// onMounted(() => {
//   watchEffect(() => {
//     pageTableRef.value!.currentFlag = isShowCardPanel.value ? "list" : "table";
//   });
// });

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

const handleEditGood = async (data: any) => {
  const res = await httpGetGoodsInfo({ id: data.item.fmodelid });
  if (res.code >= 1) {
    emit("edit-good", res);
  } else {
    message.show(res.msg, res.type);
  }
};

const addGoods = (rows: any) => {
  // 先判断当前的显示样式
  if (currentFlag.value === "table") {
    // 如果是表格样式，则直接调用表格的编辑方法
    pageTableRef.value!.insert(rows);
  }
};

const handleDbClick = async (params: any) => {
  const { row } = params;
  handleEditGood({ item: { ...row } });
};

defineExpose({
  addGoods,
  handleToggleClick,
});
</script>

<style scoped></style>
