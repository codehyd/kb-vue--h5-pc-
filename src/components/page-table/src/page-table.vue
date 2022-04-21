<template>
  <div class="page-table">
    <base-table
      ref="baseTableRef"
      @menu-click="handleMenuClick"
      v-bind="autoTableConfig"
    >
      <!-- 操作选项 -->
      <template #table-active="{ row, column, rowIndex }">
        <div class="tableActive">
          <template v-for="item in tableActiveConfig" :key="item">
            <active-item
              @menu-click="handleMenuItemClick($event, row, column)"
              :config="item"
            ></active-item>
          </template>
        </div>
      </template>
    </base-table>
    <kb-dialog :top="2" v-model:show="showPrintPanel" title="单据打印预览">
      <iframe
        :style="{ height: '85vh', width: '100%' }"
        :src="printUrl"
      ></iframe>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import BaseTable, { ITableConfigType } from "@/base-ui/table";
import KbDialog from "@/base-ui/dialog";
import ActiveItem from "./cpns/active-item.vue";
import { ITableActiveConfigType } from "../type";
import useMenuHooks from "./hooks/useMenuHooks";
import message from "@/utils/message";

const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfigType;
    tableActiveConfig?: ITableActiveConfigType[];
  }>(),
  {
    tableActiveConfig: () => [],
  }
);

const emit = defineEmits(["on-active-detail", "on-detail"]);
const autoTableConfig = computed(() => props.tableConfig);

// 操作面板点击事件
const handleMenuItemClick = (config: any, row: any, column: any) => {
  const activeConfig: "detail"[] = ["detail"];

  if (activeConfig.indexOf(config.type) > -1) {
    const activeText = activeConfig[activeConfig.indexOf(config.type)];
    emit(`on-active-${activeText}`, { row, column, config });
  }
};

const { handleMenuClick, baseTableRef } = useMenuHooks(
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
  // 弹出提示框 是否新网页打开
  message.confirm(
    "是否在新网页打开打印预览",
    () => {
      // 新网页打开链接
      window.open(params.url, "_blank");
    },
    () => {
      printUrl.value = params.url;
      showPrintPanel.value = true;
    }
  );
}

// 详情回调
function detailCallback(params: any) {
  emit("on-detail", params);
}

// 删除回调
function deleteCallback(params: any) {
  const { row } = params;
  baseTableRef.value?.remove(row);
}

// 收款回调
function payCallback() {}
</script>

<style scoped></style>
