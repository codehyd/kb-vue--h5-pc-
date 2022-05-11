<template>
  <div class="bild-query-content">
    <!-- 检索内容 -->
    <div class="search card">
      <page-search
        @query-click="handleQueryClick"
        v-bind="searchConfig"
      ></page-search>
    </div>

    <!-- 查询表格 -->
    <div class="table card">
      <div class="options">
        <el-button @click="handleToggle" icon="plus" round>开单</el-button>
      </div>
      <page-table
        ref="pageTableRef"
        @db-click="handleDbClick"
        @page-change="handlePageChange"
        :table-config="pageTableConfig"
        :billtypeid="billtypeid"
      ></page-table>
    </div>

    <!-- 详情表格 -->
    <detail-panel
      @active-click="handleActiveClick"
      :tableConfig="detailTableConfig"
      :billtypeid="billtypeid"
      ref="detailPanelRef"
    ></detail-panel>
  </div>
</template>

<script setup lang="ts">
// 检索组件
import PageSearch from "@/components/page-search";
// 检索组件传递的类型
import type {
  IBildQueryDetailTable,
  IBildQueryForm,
  IBildQueryTable,
} from "../type";
// 表格请求类型
import type { IBillid, ITableType } from "@/service/http/home/commit";
// 表格组件
import PageTable, { activeType } from "@/components/page-table";
// 表格hooks
import useTableHooks from "./hooks/useTableHooks";
// 详情面板
import DetailPanel from "./cpns/detail-panel.vue";
// 客户config的类型
import { IPageDesciptionType } from "@/components/page-description";
// 状态管理
import { useStore } from "@/store";

const props = withDefaults(
  defineProps<{
    searchConfig: IBildQueryForm;
    tableConfig: IBildQueryTable;
    detailTablConfig: IBildQueryDetailTable;
    data: ITableType;
    showColumnBilltypeid: number;
    billtypeid: IBillid;
  }>(),
  {}
);

const emit = defineEmits(["query-click", "toggle-click", "another-click"]);

const store = useStore();

// 组件ref
const detailPanelRef = ref<InstanceType<typeof DetailPanel>>();
const pageTableRef = ref<InstanceType<typeof PageTable>>();

const { pageTableConfig, getTableData, detailTableConfig, handleDbClick } =
  useTableHooks(
    props.data,
    props.showColumnBilltypeid,
    openDetailFn,
    props.tableConfig,
    props.detailTablConfig
  );

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
  pageTableConfig.page = val;
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
const handleMenuDetail = (params: any) => {
  console.log(params.finterid);
};

// 打开打印预览
function openPrePrint() {}

// 开单
const handleToggle = () => {
  store.commit("bild/changeBilltypeid", props.billtypeid);
  emit("toggle-click");
};

const handleActiveClick = (type: activeType, rows: any) => {
  console.log(type);
  const methods = {
    // checkPrint: () => pageTableRef.value?.onCheckPrint(rows[0]),
    audit: () => pageTableRef.value?.auditFn(rows[0]),
    print: () => pageTableRef.value?.printFn(rows[0]),
    anotherList: () => {
      detailPanelRef.value!.isShowPanel = false;
      emit("another-click", rows);
    },
  };

  methods[type] && methods[type]();
};

const newTableConfig = computed(() => {
  return {
    ...props.tableConfig,
  };
});

// 导出方法
defineExpose({
  getTableData,
});
</script>

<style scoped>
.search {
  margin: 0 0 10px 0;
}
.options {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 10px 0;
}
</style>
