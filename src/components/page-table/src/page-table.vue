<template>
  <div class="page-table">
    <template v-if="currentFlag == 'table' || !cardPanel">
      <base-table
        ref="baseTableRef"
        @menu-click="handleMenuClick"
        @db-click="handleDbClick"
        @expand="handleExpand"
        v-bind="autoTableConfig"
      >
        <template #default="{ row, column }">
          <slot :name="column.field" :column="column" :row="row">
            <template
              v-if="column.field == 'fcptiaoma' || column.field == 'ftiaoma'"
            >
              <kb-barcode card :barcode="row[column.field]"></kb-barcode>
            </template>
            <template v-if="column.field == 'fbillstatus'">
              <span :style="formatStatusCss(row[column.field])">
                {{ row[column.field] }}</span
              >
            </template>
          </slot>
        </template>
        <!-- 编辑模式 -->
        <template #edit="{ row, column, rowIndex }">
          <edit-table-column
            :editFooterMethod="editFooterMethod"
            :addBianmaMethod="addBianmaMethod"
            :column="column"
            :row="row"
            v-model="row[column.field]"
            @update:modelValue="handleUpdateModelValue"
            :index="rowIndex"
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
              v-for="(item, index) in tableConfig.tableActiveConfig"
              :key="item.optionType"
            >
              <active-item
                @menu-click="handleMenuItemClick($event, row, column)"
                :config="item"
              ></active-item>
            </template>
          </div>
        </template>
        <!-- checked -->
        <template #checked="{ row, column, rowIndex }">
          <slot name="checked" :row="row" :column="column" :rowIndex="rowIndex">
            <el-checkbox v-model="row.checked" size="large" />
          </slot>
        </template>
      </base-table>
    </template>

    <template v-else>
      <slot name="list" :data="tableConfig.data"></slot>
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
import { useStore } from "@/store";

import KbBarcode from "@/base-ui/barcode";
import BaseTable, { ITableConfigType } from "@/base-ui/table";
import KbDialog from "@/base-ui/dialog";
import ActiveItem from "./cpns/active-item.vue";

import useMenuHooks from "./hooks/useMenuHooks";
import useEditHooks from "./hooks/useEditHooks";
import message from "@/utils/message";
import EditTableColumn from "./cpns/edit-table-column.vue";
import Pagination from "./cpns/pagination.vue";
import { IBillid } from "@/service/http/home/commit";

const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfigType;
    billtypeid?: IBillid;
    cardPanel?: boolean;

    // tableActiveConfig?: ITableActiveConfigType[];
  }>(),
  {
    cardPanel: false,
    // tableActiveConfig: () => [],
  }
);

const emit = defineEmits(["on-detail", "db-click", "page-change", "expand"]);

const store = useStore();
const isShowCardPanel = computed(() => {
  const config = store.state.setup?.config["pc-goods"]?.setup ?? [];
  const isCard =
    config.find((item: any) => item.id === "goodCardPanel")?.value ?? true;
  return isCard;
});

const statusCss = computed(() => {
  const config = store.state.setup?.config["pc-table"]?.setup ?? [];
  const cssList =
    config.find((item: any) => item.id === "billingStatus")?.value ?? [];
  return cssList;
});

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
    pay: () => onPay(row),
    payment: () => onPayment(row),
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
  onPay,
  onPayment,
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
  emit("on-detail", params);
  // mitter.emit("menu-detail-click", params);
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
const validate = (isSelect: boolean, rows?: any) => {
  return new Promise((resolve) => {
    baseTableRef.value?.fullValiTable(isSelect, rows).then((res) => {
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

const { handleUpdateModelValue, changeAmount } = useEditHooks(editFooterMethod);

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

const addBianmaMethod = (row: any, isRedo: boolean, index: number) => {
  const fullData = [...(baseTableRef.value?.getTableData().fullData ?? [])];
  // fidx == -1 则是新增
  const fidx = fullData.findIndex(
    (item: any) => item.fmodelid === row.fmodelid
  );
  if (fidx == -1) {
    const idx = fullData.findIndex((item) => !item.fmodelid);
    console.log(fidx, index, idx, 1111111111);
    row.fqty = 1;
    const newRow = { ...changeAmount(row).newRow };
    fullData[idx] = newRow;
    // console.log(fullData[idx]);
    // fullData[index] = getInitColumn();
    baseTableRef.value?.loadTableData(fullData, true);
  } else {
    console.log(fidx, index, 222222222222222);

    if (fullData[index].fmodelid) {
      return message.confirm(
        "该行已拥有产品编码，是否覆盖？",
        () => {
          fullData[index].fqty = 1;
          fullData[index] = { ...changeAmount(row).newRow };
          baseTableRef.value?.loadTableData(fullData, true);
        },
        () => {
          if (isRedo) {
            fullData[index] = { ...changeAmount(row).newRow };
            baseTableRef.value?.loadTableData(fullData, true);
          }
        }
      );
    }
    fullData[fidx].fqty++;
    const newRow = { ...changeAmount(fullData[fidx]).newRow };
    fullData[fidx] = newRow;
    fullData[index] = getInitColumn();
    baseTableRef.value?.loadTableData(fullData, true);
  }
};

const formatStatusCss = (text: string) => {
  const find = statusCss.value.find((item: any) => item.title == text) ?? {};
  return {
    color: find?.color ?? "#000",
    fontWeight: find?.isBold ? "bold" : "normal",
    textDecoration: find?.isUnderline ? "underline" : "none",
  } as any;
};

watchEffect(() => {
  currentFlag.value = isShowCardPanel.value ? "list" : "table";
});
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
