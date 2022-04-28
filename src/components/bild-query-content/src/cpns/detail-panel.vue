<template>
  <div class="detail-panel">
    <kb-dialog v-model:show="isShowPanel">
      <header class="bildHeader">
        <h2>{{ clientInfo.fbillno }}</h2>
        <div class="billStatus">
          <template
            v-for="(item, index) in tableConfig.status"
            :key="item.field"
          >
            <el-tag
              :type="
                clientInfo[item.field] == item.successText
                  ? item.successType
                  : item.failType
              "
              >{{ clientInfo[item.field] }}</el-tag
            >
            <el-divider
              v-if="index != tableConfig.status.length - 1"
              direction="vertical"
            ></el-divider>
          </template>
        </div>
      </header>

      <!-- 客户信息 -->
      <page-description
        :data="clientInfo"
        :config="tableConfig.clientConfig"
      ></page-description>

      <!-- 详情数据 -->
      <page-table :tableConfig="tableConfig"></page-table>

      <!-- 附件内容 -->
      <accessory-content
        :bild-info="clientInfo"
        :images="images"
        :messages="messages"
        :billtypeid="billtypeid"
      ></accessory-content>
      <template #footer>
        <el-button
          type="primary"
          v-for="item in tableConfig.active"
          :key="item.type"
          @click="handleActive(item.type)"
        >
          {{ item.text }}
        </el-button>
      </template>
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
import type { activeType, IDetailTableConfig } from "@/components/page-table";
// 表格组件
import PageTable from "@/components/page-table";
import { IBillid } from "@/service/http/home/commit";
// 附件组件
import AccessoryContent from "./accessory-content.vue";

const props = withDefaults(
  defineProps<{
    // title?: string;
    tableConfig: IDetailTableConfig;
    billtypeid: IBillid;
    // detailOption?: ITableActiveConfigType[];
    // clientConfig: IPageDesciptionType[];
  }>(),
  {
    // title: "单据详情",
    // detailOption: () => [],
  }
);

const emit = defineEmits(["active-click"]);
const isShowPanel = ref(false);

const clientInfo = computed(() => props.tableConfig?.data?.[0] ?? {});

const images = computed(() => props.tableConfig?.images ?? []);
const messages = computed(() => props.tableConfig?.messages ?? []);

const handleActive = (type: activeType) => {
  emit("active-click", type, props.tableConfig?.data ?? []);
};

defineExpose({
  isShowPanel,
});
</script>

<style scoped>
.bildHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
