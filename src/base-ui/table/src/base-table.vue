<template>
  <div class="base-table">
    <vxe-table
      ref="vxeTableRef"
      :show-overflow="isShowOverFlow"
      :max-height="maxHeight"
      :size="size"
      :border="true"
      :data="data"
      :menu-config="menuConfig"
      @menu-click="handleMenuClick"
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
      <!-- 表格内容 -->
      <template v-for="item in column" :key="item[keyString]">
        <vxe-column
          :width="!isAutoColumnWidth ? item.fwidth : 0"
          :min-width="isAutoColumnWidth ? item.fwidth : 0"
          :field="item.ffieldname"
          resizable
          :align="formatAlign(item.falign)"
          :title="item.fshowname"
          :params="item"
        >
          <!-- 默认模式 -->
          <template #default="{ row, column, rowIndex }">
            <slot
              :name="column.field"
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
            >
              <span>{{ row[column.field] }}</span>
            </slot>
          </template>
        </vxe-column>
      </template>
      <template v-if="showAction">
        <vxe-column
          :width="!isAutoColumnWidth ? 60 : 0"
          :min-width="isAutoColumnWidth ? 60 : 0"
          resizable
          align="center"
          title="操作"
        >
          <!-- 默认模式 -->
          <template #default="{ row, column, rowIndex }">
            <el-popover
              :width="300"
              placement="top"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <div>{{ activeText }}</div>
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
const props = withDefaults(
  defineProps<{
    column?: any[];
    data?: any[];
    keyString: string;
    size?: "medium" | "small" | "mini";
    state?: "query" | "detail";
    showFooter?: boolean;
    showIndex?: boolean;
    showAction?: boolean;
    activeText?: string;
    menuConfig?: VxeTablePropTypes.MenuConfig;
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
    activeText: "操作",
    menuConfig: () => {
      return {};
    },
  }
);

const emit = defineEmits(["menu-click"]);

const formatAlign = (align: -1 | 0 | 1) => {
  const aligns = ["left", "center", "right"];
  return aligns[align + 1] ?? "center";
};

// 表格配置Hooks
const { isShowOverFlow, maxHeight, isAutoColumnWidth } = useTableSetup(
  props.state
);

// 表格行为Hooks
const { vxeTableRef, remove } = useTableMethods();

// 点击表格菜单
const handleMenuClick: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
  emit("menu-click", { menu, row, column });
};

defineExpose({
  remove,
});
</script>

<style scoped></style>
