<template>
  <div class="page-table">
    <template v-if="currentFlag == 'table'">
      <base-table
        ref="baseTableRef"
        @menu-click="handleMenuClick"
        @db-click="handleDbClick"
        @expand="handleExpand"
        v-bind="autoTableConfig"
      >
        <!-- 条码 -->
        <template #fcptiaoma="{ row, column }">
          <kb-barcode card :barcode="row.fcptiaoma"></kb-barcode>
        </template>
        <!-- 条码 2-->
        <template #ftiaoma="{ row, column }">
          <kb-barcode card :barcode="row.ftiaoma"></kb-barcode>
        </template>
        <!-- 编辑模式 -->
        <template #edit="{ row, column, rowIndex }">
          <edit-table-column
            :editFooterMethod="editFooterMethod"
            :column="column"
            :row="row"
            v-model="row[column.field]"
            @update:modelValue="handleUpdateModelValue"
          ></edit-table-column>
        </template>
        <template #expand="{ row, column, rowIndex }">
          <div class="expand">
            <slot
              name="tableContent"
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
            >
            </slot>
          </div>
        </template>
        <!-- 操作选项 -->
        <template #table-active="{ row, column, rowIndex }">
          <div class="tableActive">
            <template
              v-for="(item, indexx) in tableConfig.tableActiveConfig"
              :key="item.optionType"
            >
              <active-item
                @menu-click="handleMenuItemClick($event, row, column)"
                :config="item"
              ></active-item>
            </template>
          </div>
        </template>
        <template #checked="{ row, column, rowIndex }">
          <slot name="checked" :row="row" :column="column" :rowIndex="rowIndex">
            <el-checkbox v-model="row.checked" size="large" />
          </slot>
        </template>
      </base-table>
    </template>

    <template v-else>
      <slot name="list"></slot>
    </template>
    <template v-if="tableConfig.isShowPage">
      <pagination
        @page-change="handlePageChange"
        :totalPage="tableConfig.totalPage!"
        v-model:currentPage="tableConfig.page"
      ></pagination>
    </template>

    <kb-dialog :top="2" v-model:show="showPrintPanel" title="单据打印预览">
      <iframe
        :style="{ height: '85vh', width: '100%' }"
        :src="printUrl"
      ></iframe>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbBarcode from "@/base-ui/barcode";
import BaseTable, { ITableConfigType } from "@/base-ui/table";
import KbDialog from "@/base-ui/dialog";
import ActiveItem from "./cpns/active-item.vue";

import useMenuHooks from "./hooks/useMenuHooks";
import useEditHooks from "./hooks/useEditHooks";
import message from "@/utils/message";
import EditTableColumn from "./cpns/edit-table-column.vue";
import Pagination from "./cpns/pagination.vue";
import mitter from "@/mitt";
import { IBillid } from "@/service/http/home/commit";

const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfigType;
    billtypeid?: IBillid;

    // tableActiveConfig?: ITableActiveConfigType[];
  }>(),
  {
    // tableActiveConfig: () => [],
  }
);

const emit = defineEmits(["on-detail", "db-click", "page-change", "expand"]);
const currentFlag = ref<"list" | "table">("table");

// 操作面板点击事件
const handleMenuItemClick = (config: any, row: any, column: any) => {
  // const type = ["detail", "print"];
  const menuType = config.type;
  const options = {
    print: () => onPrint(row),
    detail: () => onDetail(row),
    audit: () => onAudit(row),
    delete: () => onDelete(row),
  };
  options[menuType] && options[menuType]();
};

// * -------------------------------

// 表格双击事件
const {
  handleMenuClick,
  baseTableRef,
  onPrint,
  onAudit,
  onDetail,
  onDelete,
  getTableData,
  reloadData,
  getInitColumn,
  loadingNewColumn,
  removeSelectData,
  removeAllData,
  // onCheckPrint,
} = useMenuHooks(
  props.billtypeid!,
  auditCallback,
  printCallback,
  detailCallback,
  deleteCallback,
  payCallback
);

// 审核回调
function auditCallback() {}

// 打印回调
const showPrintPanel = ref(false);
const printUrl = ref("");

function printCallback(params: any) {
  printUrl.value = params.url;
  showPrintPanel.value = true;
  // 弹出提示框 是否新网页打开
  // message.confirm(
  //   "是否在新网页打开打印预览",
  //   () => {
  //     // 新网页打开链接
  //     window.open(params.url, "_blank");
  //   },
  //   () => {
  //     printUrl.value = params.url;
  //     showPrintPanel.value = true;
  //   }
  // );
}

// 详情回调
function detailCallback(params: any) {
  // emit("on-detail", params);
  mitter.emit("menu-detail-click", params);
}

// 删除回调
function deleteCallback(params: any) {
  const { row } = params;
  baseTableRef.value?.remove(row);
}

// 调用打印方法
const printFn = (row: any) => {
  onPrint(row);
};

// 调用审核方法
const auditFn = (row: any) => {
  onAudit(row);
};

// 收款回调
function payCallback() {}

// * --------------------------------------------

// 双击点击
const handleDbClick = (params: any) => {
  emit("db-click", {
    row: params.row,
    column: params.column,
  });
};

// 给tableConfig设置veifyConfig
const autoTableConfig = computed(() => {
  const { state, veifyConfig } = props.tableConfig;
  if (state !== "edit") return props.tableConfig;
  if (veifyConfig) return props.tableConfig;
  else {
    const column = [...(props.tableConfig?.column ?? [])] ?? [];
    const veifyConfig: any = {};
    column.forEach((item: any) => {
      if (item.fnull == -1 && item.fdatatype == "decimal") {
        veifyConfig[item.ffieldname] = [
          {
            required: true,
            message: item.fshowname + "不能为空",
          },
          {
            pattern: /[^0\x22]+/,
            message: "不能等于0",
          },
        ];
      } else if (item.fnull == -1 && item.fdatatype !== "decimal") {
        veifyConfig[item.ffieldname] = [
          {
            required: true,
            message: item.fshowname + "不能为空",
          },
        ];
      }
    });
    return { ...props.tableConfig, veifyConfig };
  }
});

// 添加
const insert = (row: any, index: number = -1) => {
  baseTableRef.value?.insert(row, index);
};

// 校验数据
const validate = (isSelect: boolean) => {
  return new Promise((resolve) => {
    baseTableRef.value?.fullValiTable(isSelect).then((res) => {
      if (res) {
        message.show("校验表格失败 请输入表格必填信息");
        resolve({
          valitable: false,
          ...res,
        });
      } else {
        resolve({
          valitable: true,
          data: baseTableRef.value?.getTableData()?.fullData ?? [],
        });
      }
    });
  });
};

const handlePageChange = (val: number) => {
  emit("page-change", val);
};

const { handleUpdateModelValue } = useEditHooks(editFooterMethod);

// 修改footer
function editFooterMethod() {
  const baseTable = baseTableRef.value;
  if (baseTable) {
    baseTable.updateFooter();
  }
}

const handleExpand = (params: any) => {
  const { row, expand } = params;
  emit("expand", row);
};
// const handleUpdateModelValue = (val: any, key: string, row: any) => {};

defineExpose({
  printFn,
  auditFn,
  insert,
  validate,
  getTableData,
  reloadData,
  getInitColumn,
  loadingNewColumn,
  removeSelectData,
  removeAllData,
  currentFlag,
  // onCheckPrint,
});
</script>

<style scoped>
.expand {
  /* display: flex; */
  margin: 20px;
}
</style>
