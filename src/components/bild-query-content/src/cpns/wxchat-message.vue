<template>
  <div class="wxchat-message">
    <el-button @click="handleBtnClick" type="primary">微信通知</el-button>

    <kb-dialog
      title="微信通知分享设置"
      :width="50"
      :top="4"
      v-model:show="show"
    >
      <div class="accountPanel">
        <h4>选择通知人</h4>
        <template v-for="item in addressList" :key="item.fid">
          <el-checkbox
            v-model="item.checked"
            :label="item.fnickname"
            size="large"
          />
        </template>
        <h4>选项</h4>
        <div>
          <template v-for="item in accountConfig" :key="item.title">
            <el-checkbox
              v-model="item.checked"
              :label="item.title"
              size="large"
              :disabled="item.disabled"
            />
          </template>
        </div>
        <h4>流程</h4>
        <div>
          <template v-for="item in accountMenuConfig" :key="item.flag">
            <el-radio
              v-model="accountMenuValue"
              :label="item.name"
              size="large"
            >
              {{ item.name }}
            </el-radio>
          </template>
        </div>
        <div class="footer">
          <el-button @click="handleSendMessage" type="primary">确定</el-button>
        </div>
      </div>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import {
  httpAccountToken,
  httpWeixinAccountMessage,
} from "@/service/http/home/commit";
import { accountConfig, accountMenuConfig } from "../config";
import KbDialog from "@/base-ui/dialog";
import base64 from "@/utils/base64";
import message from "@/utils/message";
const props = withDefaults(
  defineProps<{
    data: any;
    billtypeid: number;
  }>(),
  {}
);
const store = useStore();
const token = computed(() => store.state.login.token);

const show = ref(false);

const accountMenuValue = ref("默认");
const accentToken = ref<string>("");
const addressList = ref<any>([]);
const templateId = ref<any>("");

const handleBtnClick = async () => {
  const res = await httpAccountToken();
  if (res.code >= 1) {
    show.value = true;
    addressList.value = res.data[0].data;
    templateId.value = res.templateid;
    accentToken.value = res.accesstoken;
  }
};

const handleSendMessage = () => {
  const linkList = addressList.value.filter((item: any) => item.checked);
  if (linkList.length == 0) return message.show("请选择通讯录的人");
  const data = {
    sig: "8D5A815A0D79A3F0C2CCB556FFB08B27",
    sns: token.value.softname,
    cnstr: token.value.csname,
    billtypeid: props.billtypeid,
    billid: props.data.finterid,
    options: accountConfig.value,
    title: props.data.fbillname,
  };

  let bildConfirm =
    accountMenuValue.value == "默认" ? "" : accountMenuValue.value;

  linkList.forEach(async (item: any) => {
    const res = await httpWeixinAccountMessage({
      token: accentToken.value,
      billtypeid: props.billtypeid,
      billid: props.data.finterid,
      gzhopenid: item.fopenid,
      content: base64.objToEncode({
        touser: item.fopenid,
        template_id: templateId.value,
        miniprogram: {
          appid: "wxbe6756ab2557a17b",
          // pagepath: "pages/index/index",
          pagepath:
            "pageB2/shareBild/index?data=" +
            `${JSON.stringify(data)}` +
            `&bildConfirm=${bildConfirm}`,
        },
        topcolor: "#FF0000",
        data: {
          first: {
            value: "尊敬的客户:货物已经发出,请留意接收",
            color: "#173177",
          },
          keyword1: {
            value: props.data.fkhname,
            color: "#173177",
          },
          keyword2: {
            value: props.data.fbillno,
            color: "#173177",
          },
          keyword3: {
            value: "点击查看详情",
            color: "#173177",
          },
          keyword4: {
            value: [props.data].reduce(
              (init: number, item: any) => init + item.fqty,
              0
            ),
            color: "#173177",
          },
          keyword5: {
            value: "",
            color: "#173177",
          },
          remark: {
            value: "如有疑问，请与我们联系",
            color: "#FF0000",
          },
        },
      }),
    });

    if (res.code >= 1) {
      message.success(`(${item.fnickname})` + "发送成功");
    } else {
      message.show("发送失败");
    }
  });
};
</script>

<style scoped>
.wxchat-message {
  /* display: inline-flex; */
  margin: 0 12px 0 0;
}
.accountPanel {
  text-align: left;
}
.footer {
  text-align: right;
}
</style>
