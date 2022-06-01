<template>
  <div>
    <el-dialog
      v-model="isShowPanel"
      title="微信扫码登录"
      width="85vw"
      append-to-body
    >
      <div class="content">
        <el-steps :active="active" finish-status="success">
          <el-step title="选择软件系统" />
          <el-step title="微信扫码登录" />
          <!-- <el-step title="绑定相关信息" /> -->
        </el-steps>

        <template v-if="active >= 0">
          <el-radio
            v-for="(item, index) in softOptions"
            :key="item.label"
            v-model="selectSoft"
            :label="item.value"
            size="large"
          >
            {{ item.label }}
          </el-radio>
        </template>
        <template v-if="active >= 1">
          <div class="wxLoginScanWrap">
            <iframe
              sandbox="allow-scripts allow-top-navigation"
              scrolling="no"
              width="300"
              height="400"
              frameBorder="0"
              allowTransparency="true"
              :src="wxLoginSrc"
            ></iframe>
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { softOptions } from "@/config";
const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {}
);

const emit = defineEmits(["update:show"]);

const isShowPanel = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});
// 步骤条状态
const active = ref(0);

// 第一步：选择软件系统

// 选择软件系统
const selectSoft = ref("");

// 第二步: 微信扫码
const wxLoginSrc = ref("");

// 获取当前的域名
const getDomain = () => {
  const host = window.location.host;
  // console.log(host);
  let appid = "";
  let dns = "";
  if (host == "localhost:5000" || host == "t.dianlan8.com") {
    appid = "wxa38fd5a19f010be2";
    dns = "https://t.dianlan8.com/#/login?appid=";
  } else {
    appid = "wxd1f24ae1f8f02218";
    dns = "https://v.dianlan8.com/#/login?appid=";
  }
  // const domain = host.split(".")[1];
  return { appid, dns };
};

// console.log(getDomain());

const Tappid = "wxa38fd5a19f010be2"; // 测试 wxa38fd5a19f010be2
const Sappid = "wxd1f24ae1f8f02218"; // 线上：wxd1f24ae1f8f02218

let wxTrequestUrl = "https://t.dianlan8.com/#/login?appid="; // 测试

let wxSrequestUrl = "https://v.dianlan8.com/#/login?appid="; // 线上

let state = "";

// 监听软件系统变化 切换第二步 并且设置微信登录链接
watchEffect(() => {
  if (selectSoft.value) {
    openScan();
  }
});

function openScan() {
  active.value = 1;
  wxLoginSrc.value = `https://open.weixin.qq.com/connect/qrconnect?appid=${
    getDomain().appid
  }&scope=snsapi_login&redirect_uri=${encodeURIComponent(
    getDomain().dns + `${getDomain().appid}` + "&sns=" + selectSoft.value
  )}&state=${state}&login_type=jssdk&style=black&self_redirect=default&href=`;
}

defineExpose({
  selectSoft,
});
</script>

<style lang="less" scoped>
.content {
  height: 800px;
}

.wxLoginScanWrap {
  display: flex;
  justify-content: center;
}
</style>
