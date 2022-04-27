<template>
  <div class="page-bild-detail-table">
    <kb-dialog :top="3" :title="title" v-model:show="show">
      <header class="bildHeader">
        <h3>{{ billno }}</h3>
        <div>
          <slot name="right" :data="clientInfo"></slot>
        </div>
      </header>

      <!-- 客户信息 -->
      <page-description
        :data="clientInfo"
        :config="clientConfig"
      ></page-description>

      <!-- 详情表格 -->
      <page-table ref="pageTableRef" :tableConfig="tableConfig"></page-table>

      <!-- 附件操作 -->
      <div class="active">
        <em>更改图片</em>
        <em @click="handleMessageAddClick">添加留言</em>
      </div>

      <!-- 附件内容 -->
      <div class="accessory card">
        <!-- 图片 -->
        <base-image
          @update-file="handleUpdateFile"
          :urls="imagesList"
          :height="100"
          :width="100"
        ></base-image>
        <!-- 留言 -->
        <div class="message">
          <template v-for="item in messageList" :key="item.fid">
            <div class="message-item card" @click="handleMessageClick(item)">
              <div class="message-item-title">
                <span class="name">
                  {{ item.fusername }}
                  <kb-icon
                    v-if="item.furl"
                    name="Comment"
                    flag="elIcon"
                  ></kb-icon>
                </span>
                <span>{{ item.fdatetime }}</span>
              </div>
              <div class="message-item-content">
                <span>内容:{{ item.fmessage }}</span>
              </div>
            </div>
          </template>
          <template v-if="messageList.length == 0">
            <div>
              <kb-icon name="InfoFilled" flag="elIcon">
                <template #text>
                  暂无留言
                  <em @click="handleMessageAddClick">点击添加</em>
                </template>
              </kb-icon>
            </div>
          </template>
        </div>
      </div>

      <!-- 底部 -->
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

      <kb-dialog :top="2" v-model:show="messageSigShow" title="单据打印预览">
        <iframe
          :style="{ height: '85vh', width: '100%' }"
          :src="messageSigurl"
        ></iframe>
      </kb-dialog>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { IDetailTableConfig, ITableActiveConfigType } from "../type";
import KbDialog from "@/base-ui/dialog";
import PageTable from "./page-table.vue";
import BaseImage from "@/base-ui/image";
import KbIcon from "@/base-ui/icon";
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

const pageTableRef = ref<InstanceType<typeof PageTable>>();

const bildData = computed(() => props.tableConfig.data ?? []);
const messageList = computed(() => props.tableConfig.messages ?? []);
const imagesList = computed(() => props.tableConfig.images ?? []);
const clientInfo = computed(() => bildData.value?.[0] ?? {});
const billno = computed(() => bildData.value?.[0]?.fbillno ?? "");

console.log(messageList);

const show = ref(false);

const messageSigShow = ref(false);
const messageSigurl = ref("");

const handleMenuClick = (params: any) => {
  const { type, config } = params;
  // 单据审核
  if (type == "audit") {
    pageTableRef.value?.auditFn(clientInfo.value);
  }

  // 单据打印
  else if (type == "print") {
    pageTableRef.value?.printFn(clientInfo.value);
  }
  // 再来一单
};

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

const handleMessageClick = (item: any) => {
  if (item.furl) {
    message.confirm(
      "是否在新网页打开打印预览",
      () => {
        // 新网页打开链接
        window.open(item.furl, "_blank");
      },
      () => {
        messageSigShow.value = true;
        messageSigurl.value = item.furl;
      }
    );
  }
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

.active {
  margin: 10px 0;
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

  .message-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    width: 24%;
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
@media all and (max-width: 1366px) {
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

// 媒体查询 窗口小于1366px的时候
@media all and (max-width: 1600px) {
  .message-item {
    width: 48% !important;
  }
}
</style>
