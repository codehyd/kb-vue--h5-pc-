<template>
  <div class="accessory-content card">
    <div class="active">
      <em>更改图片</em>
      <em @click="handleMessageAddClick">添加留言</em>
    </div>

    <!-- 附件内容 -->
    <div class="accessory">
      <!-- 图片 -->
      <base-image
        @update-file="handleUpdateFile"
        :urls="images"
        :height="100"
        :width="100"
      ></base-image>
      <!-- 留言 -->
      <div class="message">
        <template v-for="item in messages" :key="item.fid">
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
        <template v-if="messages.length == 0">
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

    <!-- 预览 -->
    <kb-dialog :top="2" v-model:show="messageSigShow" title="单据打印预览">
      <iframe
        :style="{ height: '85vh', width: '100%' }"
        :src="messageSigurl"
      ></iframe>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { httpSubmitMessage, httpUpdateImage } from "@/service/http/home/commit";
import message from "@/utils/message";
// 图片组件
import BaseImage from "@/base-ui/image";

import KbDialog from "@/base-ui/dialog";

import KbIcon from "@/base-ui/icon";

import mitter from "@/mitt";

const props = withDefaults(
  defineProps<{
    images: string[];
    messages: any[];
    bildInfo: any;
  }>(),
  {
    images: () => {
      return [];
    },
    messages: () => {
      return [];
    },
  }
);
// 上传图片
const handleUpdateFile = async (files: any, index: number) => {
  const fileindex = index + 1;
  const file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  const res = await httpUpdateImage(formData, {
    billid: props.bildInfo.finterid,
    fileindex,
    billtypeid: props.bildInfo.ftype,
  });
  if (res.code >= 1) {
    mitter.emit("update-image", res.atturlarray);
  }
  message.show(res.msg, res.type);
};
// 提交留言
const handleMessageAddClick = () => {
  message.prompt("请输入留言信息", "留言").then(async (msg) => {
    const res = await httpSubmitMessage({
      message: msg,
      billid: props.bildInfo.finterid,
      billtypeid: props.bildInfo.ftype,
    });
    if (res.code >= 1) {
      mitter.emit("update-message", res.data[0].data);
    }
    message.show(res.msg, res.type);
  });
};

// 点击留言预览图片
const messageSigShow = ref(false);
const messageSigurl = ref("");
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
</script>

<style lang="less" scoped>
.active,
.accessory-content {
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
