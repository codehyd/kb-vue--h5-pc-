<template>
  <div class="base-table">
    <vxe-table
      ref="vxeTableRef"
      :show-overflow="isShowOverFlow"
      :max-height="maxHeight"
      :size="size"
      :border="true"
      resizable
      show-header-overflow
      show-footer-overflow
      highlight-hover-row
      :loading="isLoading"
      header-align="center"
      footer-align="center"
      :menu-config="menuConfig"
      @menu-click="handleMenuClick"
      @cell-dblclick="handleCellDbClick"
      :edit-config="editConfig()"
      @edit-actived="handlerEditActived"
      :edit-rules="veifyConfig"
      :mouse-config="{ selected: true }"
      keep-source
      :keyboard-config="{
        isArrow: true,
        isEnter: true,
        isTab: true,
        isEdit: true,
        isChecked: true,
        enterToTab: true,
      }"
      border
      :cell-class-name="cellClassName"
      :checkbox-config="{
        checkField: 'checked',
        showHeader: false,
      }"
      v-bind="scrollConfig"
      show-footer
      :footer-method="footerMethod"
    >
      <!-- 索引 -->
      <template v-if="showIndex">
        <vxe-column width="60" fixed="left" type="seq" title=" " align="center">
          <template #default="{ row, column, rowIndex }">
            <slot
              name="rowIndexId"
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
            >
              {{ rowIndex + 1 }}
            </slot>
          </template>
        </vxe-column>
      </template>
      <!-- 编辑模式下必须有的单选框 -->
      <template v-if="state == 'edit' || showSelect">
        <vxe-column fixed="left" type="checkbox" :width="80" align="center">
          <template #checkbox="{ row, column, rowIndex }">
            <slot
              name="checked"
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
            >
              <el-checkbox v-model="row.checked" size="large" />
            </slot>
          </template>
        </vxe-column>
      </template>
      <!-- 表格列内容 -->
      <template v-for="item in column" :key="item[keyString]">
        <vxe-column
          :width="!isAutoColumnWidth ? item.fwidth : 0"
          :min-width="isAutoColumnWidth ? item.fwidth : 0"
          :field="item.ffieldname"
          resizable
          :align="formatAlign(item.falign)"
          :title="item.fshowname"
          :params="item"
          :edit-render="columnEditRender(item)"
        >
          <!-- 默认模式 -->
          <template #default="{ row, column, rowIndex }">
            <slot
              :name="column.field"
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
            >
              <span>{{ row[column.field] == 0 ? "" : row[column.field] }}</span>
            </slot>
          </template>
          <!-- 编辑模式 -->
          <template v-if="state == 'edit'" #edit="{ row, column, rowIndex }">
            <slot name="edit" :row="row" :column="column" :rowIndex="rowIndex">
              <el-input v-model.trim="row[column.field]"></el-input>
            </slot>
          </template>
        </vxe-column>
      </template>
      <!-- 右边操作选项 -->
      <template v-if="showAction">
        <vxe-column
          :width="!isAutoColumnWidth ? 60 : 0"
          :min-width="isAutoColumnWidth ? 60 : 0"
          resizable
          align="center"
          title="操作选项"
        >
          <!-- 默认模式 -->
          <template #default="{ row, column, rowIndex }">
            <el-popover
              :width="300"
              placement="top"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <kb-icon
                  flag="elIcon"
                  name="Setting"
                  :text="activeText"
                  :size="12"
                ></kb-icon>
                <!-- <div class="activeText">{{ activeText }}</div> -->
              </template>
              <div>{{ row["fbillno"] }}单号操作</div>
              <div style="margin: 10px 0 0 0">
                <slot
                  name="table-active"
                  :row="row"
                  :column="column"
                  :rowIndex="rowIndex"
                >
                  <span style="color: #cfcccc">暂无可操作选项</span>
                </slot>
              </div>
            </el-popover>
          </template>
        </vxe-column>
      </template>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { VxeTablePropTypes, VxeTableEvents } from "vxe-table";
import useTableSetup from "./hooks/useTableSetup";
import useTableMethods from "./hooks/useTableMethods";
import { ImodeType } from "../type";
import mitter from "@/mitt";
import message from "@/utils/message";
import KbIcon from "@/base-ui/icon";

const props = withDefaults(
  defineProps<{
    column?: any[];
    data?: any[];
    keyString: string;
    size?: "medium" | "small" | "mini";
    state?: ImodeType;
    showFooter?: boolean;
    showIndex?: boolean;
    showAction?: boolean;
    showSelect?: boolean;
    activeText?: string;
    menuConfig?: VxeTablePropTypes.MenuConfig;
    veifyConfig?: object;
    loading?: boolean;
  }>(),
  {
    column: () => {
      return [];
    },
    data: () => {
      return [];
    },
    size: "mini",
    state: "query",
    showFooter: false,
    showIndex: true,
    showAction: true,
    showSelect: false,
    activeText: "操作",
    menuConfig: () => {
      return {};
    },
    veifyConfig: () => {
      return {};
    },
    loading: false,
  }
);

const emit = defineEmits(["menu-click", "db-click"]);

const formatAlign = (align: -1 | 0 | 1) => {
  const aligns = ["left", "center", "right"];
  return aligns[align + 1] ?? "center";
};

// 表格配置Hooks
const {
  isShowOverFlow,
  maxHeight,
  isAutoColumnWidth,
  editConfig,
  handlerEditActived,
  columnEditRender,
  cellClassName,
  scrollConfig,
  virtualScrollSize,
  footerMethod,
} = useTableSetup(props.state);

// 表格行为Hooks
const {
  vxeTableRef,
  remove,
  insert,
  loadTableData,
  fullValiTable,
  getTableData,
  updateFooter,
} = useTableMethods();

// 点击表格菜单
const handleMenuClick: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
  emit("menu-click", { menu, row, column });
};

const handleCellDbClick: VxeTableEvents.CellDblclick = ({ row, column }) => {
  emit("db-click", { row, column });
};

// 事件总线 添加新行
mitter.on("base-table-add-new-rows", () => {
  const newRow = getInitColumn();
  const vxeTable = vxeTableRef.value;
  if (vxeTable) {
    vxeTable?.insertAt(newRow, -1);
    message.success("添加成功");
  }
});
// 删除选中行
mitter.on("base-table-remove-select-rows", () => {
  const vxeTable = vxeTableRef.value;
  if (vxeTable) {
    const rows = vxeTable.getCheckboxRecords();
    if (rows.length == 0) return message.show("暂无选中行");
    vxeTable?.remove(rows);
  }
});
// 删除全部行 需要先获取全部行数据
mitter.on("base-table-remove-all-rows", () => {
  const vxeTable = vxeTableRef.value;
  if (vxeTable) {
    const { insertRecords } = vxeTable.getRecordset();
    if (insertRecords.length == 0) return message.show("暂无数据");
    vxeTable?.remove(insertRecords);
  }
});

onMounted(() => {
  if (props.state == "edit") {
    watchEffect(
      () => {
        const newRow = getInitColumn();
        const size = virtualScrollSize.value ?? 1;
        const dataList = [];
        for (let i = 0; i < size; i++) {
          dataList.push(newRow);
        }
        loadTableData(dataList);
      },
      { flush: "post" }
    );
  }
});

function getInitColumn() {
  const newRow: any = {};
  [...props.column].forEach((item) => {
    if (item.fdatatype == "decimal") {
      newRow[item.ffieldname] = 0;
    } else {
      newRow[item.ffieldname] = "";
    }
  });
  newRow.checked = true;
  return newRow;
}

const isLoading = ref(false);

watchEffect(() => {
  const data = props.data ?? [];
  if (props.loading) {
    isLoading.value = true;
    loadTableData(data);
    nextTick(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
  } else {
    loadTableData(data);
  }
});

defineExpose({
  remove,
  insert,
  loadTableData,
  fullValiTable,
  getTableData,
  updateFooter,
});
</script>

<style scoped>
:deep(.vxe-table .vxe-table--body .isReadonly) {
  background: #f5f7fa50;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
}
.activeText {
  cursor: pointer;
}
</style>
