<template>
  <div class="detail-panel">
    <kb-dialog v-model:show="isShowPanel">
      <!-- 客户信息 -->
      <page-description
        :data="clientInfo"
        :config="clientConfig"
      ></page-description>

      <!-- 详情数据 -->
      <page-table :tableConfig="tableConfig"></page-table>

      <!-- 附件内容 -->
      <accessory-content
        :bild-info="clientInfo"
        :images="images"
        :messages="messages"
      ></accessory-content>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
// 显示面板组件
import KbDialog from "@/base-ui/dialog";
// 数据展示组件 | 类型
import PageDescription, {
  IPageDesciptionType,
} from "@/components/page-description";
// tableConfig类型
import type { IDetailTableConfig } from "@/components/page-table";
// 表格组件
import PageTable from "@/components/page-table";
// 附件组件
import AccessoryContent from "./accessory-content.vue";

const props = withDefaults(
  defineProps<{
    // title?: string;
    tableConfig: IDetailTableConfig;
    // detailOption?: ITableActiveConfigType[];
    clientConfig: IPageDesciptionType[];
  }>(),
  {
    // title: "单据详情",
    // detailOption: () => [],
  }
);

const isShowPanel = ref(false);

const clientInfo = computed(() => props.tableConfig?.data?.[0] ?? {});

const images = computed(() => props.tableConfig?.images ?? []);
const messages = computed(() => props.tableConfig?.messages ?? []);

defineExpose({
  isShowPanel,
});
</script>

<style scoped></style>
