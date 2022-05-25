<template>
  <div class="detail-panel">
    <kb-dialog :title="bildTitle" v-model:show="isShowPanel">
      <header class="bildHeader">
        <h2>{{ clientInfo.fbillno }}</h2>
        <!-- status -->
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
            >
              {{ clientInfo[item.field] }}
            </el-tag>
            <el-divider
              v-if="(tableConfig?.status?.length ?? 0) - 1 != index"
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
        <div class="footer">
          <wxchat-message
            :billtypeid="billtypeid"
            :data="clientInfo"
            v-if="showWeChat"
          ></wxchat-message>

          <el-button
            type="primary"
            v-for="item in tableConfig.active"
            :key="item.type"
            @click="handleActive(item.type)"
          >
            {{ item.text }}
          </el-button>
        </div>
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
import WxchatMessage from "./wxchat-message.vue";

import { useStore } from "@/store";

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

const store = useStore();

const isShowPanel = ref(false);

const clientInfo = computed(() => props.tableConfig?.data?.[0] ?? {});

const images = computed(() => props.tableConfig?.images ?? []);
const messages = computed(() => props.tableConfig?.messages ?? []);

const handleActive = (type: activeType) => {
  emit("active-click", type, props.tableConfig?.data ?? []);
};

const route = useRoute();

const bildTitle = computed(() => {
  let title = route.meta?.title;
  let configTitle = props.tableConfig?.title;
  if (title == "销售对账") {
    title = clientInfo.value.fbillname;
  }
  return (configTitle ?? title) + "单据详情";
});

const showWeChat = computed(() => {
  const config = store?.state?.setup?.config?.["pc-wechat"] ?? {};
  const weChatList = config?.setup?.find(
    (item: any) => item.id == "openWeChatMessage"
  );
  const allList = weChatList.otherOptions?.list ?? [];
  const currentValue = weChatList.value ?? [];

  const checkWeChatList: any = [];
  for (const item of currentValue) {
    // console.log(allList);
    const find = allList.find((findItem: any) => findItem.label == item);
    // console.log(find);
    if (!find.disabled) {
      checkWeChatList.push(find);
    }
  }

  // 判断checkWeChatList每一项中的id是否和props.billtypeid相同
  const check = checkWeChatList.find((item: any) => {
    return item.id == props.billtypeid;
  });

  return check ? true : false;
});

defineExpose({
  isShowPanel,
});
</script>

<style scoped>
.bildHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  /* margin-bottom: 10px; */
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
