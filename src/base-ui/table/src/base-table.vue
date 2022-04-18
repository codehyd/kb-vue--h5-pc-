<template>
  <div class="base-table">
    <vxe-table
      :show-overflow="isShowOverFlow"
      :max-height="maxHeight"
      :size="size"
      :border="true"
      :data="data"
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
            <slot :row="row" :column="column" :rowIndex="rowIndex">
              <span>{{ row[column.field] }}</span>
            </slot>
          </template>
        </vxe-column>
      </template>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const props = withDefaults(
  defineProps<{
    column?: any[];
    data?: any[];
    keyString: string;
    size?: "medium" | "small" | "mini";
    state?: "query";
    showFooter?: boolean;
    showIndex?: boolean;
  }>(),
  {
    column: () => [],
    data: () => [],
    size: "mini",
    state: "query",
    showFooter: false,
    showIndex: true,
  }
);

const store = useStore();

const formatAlign = (align: -1 | 0 | 1) => {
  const aligns = ["left", "center", "right"];
  return aligns[align + 1] ?? "center";
};

// 表格最大的高度
const maxHeight = computed(() => {
  let maxHeight;
  if (props.state == "query") {
    maxHeight =
      store.state.setup.config?.["pc-table"]?.setup?.find(
        (item: any) => item.id == "queryTableMaxHeight"
      )?.value ?? 700;
  }
  return maxHeight ?? 500;
});

// 表格column的配置
const isAutoColumnWidth = computed(
  () =>
    store.state.setup.config?.["pc-table"]?.setup?.find(
      (item: any) => item.id == "isAutoWidth"
    )?.value ?? false
);
const isShowOverFlow = computed(
  () =>
    store.state.setup.config?.["pc-table"]?.setup?.find(
      (item: any) => item.id == "isShowOverFlow"
    )?.value ?? false
);
</script>

<style scoped></style>
