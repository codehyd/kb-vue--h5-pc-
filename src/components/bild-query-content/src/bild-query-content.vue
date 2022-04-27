<template>
  <div class="bild-query-content">
    <!-- 检索内容 -->
    <page-search
      @query-click="handleQueryClick"
      v-bind="searchConfig"
    ></page-search>

    <!-- 查询表格 -->
    <div class="options">
      <el-button @click="handleToggle" icon="plus" round>开单</el-button>
    </div>
    <page-table
      @db-click="handleDbClick"
      @page-change="handlePageChange"
      :table-config="tableConfig"
    ></page-table>

    <!-- 详情表格 -->
    <detail-panel
      :tableConfig="detailTableConfig"
      :clientConfig="clientConfig"
      ref="detailPanelRef"
    ></detail-panel>
  </div>
</template>

<script setup lang="ts">
// 检索组件
import PageSearch from "@/components/page-search";
// 检索组件传递的类型
import type { IBildQueryForm } from "../type";
// 表格请求类型
import type { ITableType } from "@/service/http/home/commit";
// 表格组件
import PageTable from "@/components/page-table";
// 表格hooks
import useTableHooks from "./hooks/useTableHooks";
// 详情面板
import DetailPanel from "./cpns/detail-panel.vue";
// 客户config的类型
import { IPageDesciptionType } from "@/components/page-description";

const props = withDefaults(
  defineProps<{
    searchConfig: IBildQueryForm;
    data: ITableType;
    showColumnBilltypeid: number;
    clientConfig: IPageDesciptionType[];
  }>(),
  {}
);

const emit = defineEmits(["query-click", "toggle-click"]);

// 组件ref
const detailPanelRef = ref<InstanceType<typeof DetailPanel>>();

const { tableConfig, getTableData, detailTableConfig, handleDbClick } =
  useTableHooks(props.data, props.showColumnBilltypeid, openDetailFn);

// 点击查询
const handleQueryClick = (data: any) => {
  emit("query-click", {
    ...props.data,
    begdate: data.date[0],
    enddate: data.date[1],
    tj: data.tj,
  });
};
// 修改页码
const handlePageChange = (val: number) => {
  emit("query-click", {
    ...props.data,
    page: val,
  });
};

// 打开详情表格回调
function openDetailFn() {
  const detailPanel = detailPanelRef.value;
  if (detailPanel) {
    detailPanel.isShowPanel = true;
  }
}

// 打开打印预览
function openPrePrint() {}

// 开单
const handleToggle = () => {
  emit("toggle-click");
};

// 导出方法
defineExpose({
  getTableData,
});
</script>

<style scoped>
.options {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 10px 0;
}
</style>
