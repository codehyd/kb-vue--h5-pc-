<template>
  <div class="page-bild-detail-table">
    <kb-dialog :top="3" :title="title" v-model:show="show">
      <header class="bildHeader">
        <h3>{{ billno }}</h3>
        <div>
          <slot name="right" :data="clientInfo"></slot>
        </div>
      </header>

      <page-description
        :data="clientInfo"
        :config="clientConfig"
      ></page-description>

      <page-table :tableConfig="tableConfig"></page-table>

      <div class="accessory card">
        <base-image
          @update-file="handleUpdateFile"
          :urls="imagesList"
          :height="100"
          :width="100"
        ></base-image>
        <div class="message">
          <template v-for="item in messageList" :key="item.fid">
            <div class="message-item card">
              <div class="message-item-title">
                <span class="name">{{ item.fusername }}</span>
                <span>{{ item.fdatetime }}</span>
              </div>
              <div class="message-item-content">
                <span>内容:{{ item.fmessage }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <template #footer>
        <template
          v-for="(item, index) in detailOption"
          :key="index + item.text"
        >
          <active-item
            @menu-click="handleMenuClick"
            :config="item"
          ></active-item>
        </template>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { IDetailTableConfig, ITableActiveConfigType } from "../type";
import KbDialog from "@/base-ui/dialog";
import PageTable from "./page-table.vue";
import BaseImage from "@/base-ui/image";
import ActiveItem from "./cpns/active-item.vue";
import PageDescription, {
  IPageDesciptionType,
} from "@/components/page-description";

import { httpUpdateImage, httpSubmitMessage } from "@/service/http/home/commit";
import message from "@/utils/message";

const props = withDefaults(
  defineProps<{
    title?: string;
    tableConfig: IDetailTableConfig;
    detailOption?: ITableActiveConfigType[];
    clientConfig: IPageDesciptionType[];
  }>(),
  {
    title: "单据详情",
    detailOption: () => [],
  }
);

const emit = defineEmits(["update-file-success", "update-message-success"]);

const bildData = computed(() => props.tableConfig.data ?? []);
const messageList = computed(() => props.tableConfig.messages ?? []);
const imagesList = computed(() => props.tableConfig.images ?? []);
const clientInfo = computed(() => bildData.value?.[0] ?? {});
const billno = computed(() => bildData.value?.[0]?.fbillno ?? "");

console.log(messageList);

const show = ref(false);

const imageCol = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 5,
  xl: 5,
};
const messageCol = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 19,
  xl: 19,
};

const handleMenuClick = () => {};

// 图片替换
const handleUpdateFile = async (files: any, index: number) => {
  const fileindex = index + 1;
  const file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  const res = await httpUpdateImage(formData, {
    billid: clientInfo.value.finterid,
    fileindex,
    billtypeid: clientInfo.value.ftype,
  });
  if (res.code >= 1) {
    emit("update-file-success", res.atturlarray);
  }
  message.show(res.msg, res.type);
};

const handleMessageAddClick = () => {
  message.prompt("请输入留言信息", "留言").then(async (msg) => {
    const res = await httpSubmitMessage({
      message: msg,
      billid: clientInfo.value.finterid,
      billtypeid: clientInfo.value.ftype,
    });
    if (res.code >= 1) {
      emit("update-message-success", res.data[0].data);
    }
    message.show(res.msg, res.type);
  });
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.bildHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.accessory {
  display: flex;
  height: 135px;
  box-sizing: border-box;
  margin: 10px 0;
  padding: 15px;
  width: 100%;
}

.el-image {
  cursor: pointer;
  border: 1px solid #ccc;
}
.message {
  display: flex;
  flex: 1;
  padding-left: 10px;
  border-left: 1px solid #ccc;
  height: 100px;
  box-sizing: border-box;
  overflow: auto;
  flex-wrap: wrap;
  z-index: 5;

  // .messageAdd {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: 100px;
  //   height: 100px;
  //   cursor: pointer;
  //   div {
  //     // 虚线边框
  //     border: 1px dashed #ccc;
  //     padding: 30px 10px;
  //     &:hover {
  //       border-color: #0094ff;
  //     }
  //   }
  // }

  .message-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    width: 23%;
    height: 100px;
    // overflow: hidden;
    margin: 0 5px 10px 0;
    overflow: auto;

    .message-item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .name {
        font-weight: bold;
      }
    }

    .message-item-content {
      flex: 1;
      overflow: auto;
      margin: 5px;
    }
  }
}

// 媒体查询 窗口小于1366px的时候
@media all and(max-width: 1366px) {
  .accessory {
    flex-direction: column;
    height: auto;
  }
  .message {
    flex: 1;
    padding-left: 0px;
    margin: 10px 0 0 0;
    border: none;
  }
  .message-item {
    width: 30% !important;
  }
}
</style>
