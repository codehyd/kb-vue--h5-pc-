<template>
  <div class="login-box">
    <div class="title" :style="{ 'padding-left': labelWidth }">
      <h3>Welcome</h3>
      <h3>
        欢迎使用 开博生意管家
        <a target="_blank" class="beian" href="https://beian.miit.gov.cn/">
          粤ICP备13070897号
        </a>
      </h3>
    </div>
    <!-- 账号登录 -->
    <el-form
      :rules="rules"
      :model="accountData"
      ref="elFormRef"
      :label-width="labelWidth"
    >
      <el-form-item required prop="cnstr" label="公司名称">
        <el-input v-model="accountData.cnstr" />
      </el-form-item>
      <el-form-item required prop="uname" label="用户名称">
        <el-input v-model="accountData.uname" />
      </el-form-item>
      <el-form-item prop="upwd" label="用户密码">
        <el-input v-model="accountData.upwd" />
      </el-form-item>
      <el-form-item required prop="sns" label="软件系统">
        <el-select
          v-model="accountData.sns"
          class="elSelect"
          placeholder="请选择软件系统"
          size="large"
        >
          <el-option
            v-for="item in softOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item required prop="authCode" label="验证码">
        <el-input v-model="accountData.authCode">
          <template #append>
            <auth-code ref="authCodeRef"></auth-code>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 微信登录 -->
    <wx-login v-model:show="isShowWxScanPanel"></wx-login>
    <div class="operation" :style="{ 'padding-left': labelWidth }">
      <el-divider>第三方登录</el-divider>
      <div class="third-icons">
        <kb-icon
          @click="handleThirdWxClick"
          name="icon-weixin"
          :size="28"
        ></kb-icon>
      </div>

      <el-button
        @click="handleLoginClick"
        type="primary"
        class="loginBtn"
        round
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import KbIcon from "@/base-ui/icon";
import { useStore } from "@/store";
import message from "@/utils/message";
import { ElForm } from "element-plus";
import AuthCode from "./auth-code.vue";
import WxLogin from "./wx-login.vue";
import { accountData, rules } from "../config";
import { softOptions } from "@/config";
import { httpAccount, useWxScanLogin } from "@/service/http/login";

const store = useStore();

const labelWidth = ref("120px");
const token = computed(() => store.state.login.token);

watchEffect(() => {
  if (token.value) {
    accountData.value.csname = token.value.csname;
    accountData.value.cnstr = token.value.csname;
    accountData.value.sns = token.value.softname;
    accountData.value.uname = token.value.uname;
    accountData.value.upwd = token.value.upwd;
  }
});

// 窗口大小改变时，重新计算 labelWidth
onMounted(() => {
  window.addEventListener("resize", () => {
    labelWidth.value = window.innerWidth < 768 ? "80px" : "120px";
  });
});
// 组件Ref
const elFormRef = ref<InstanceType<typeof ElForm>>();
const authCodeRef = ref<InstanceType<typeof AuthCode>>();

// 开启微信扫码登录
const isShowWxScanPanel = ref(false);

// 第三方登录 (微信)
const handleThirdWxClick = () => {
  isShowWxScanPanel.value = true;
};

let openid = "webopenid";

// 账号登录
const handleLoginClick = async (flag?: "wxcsan") => {
  if (flag == "wxcsan") {
    const res = await httpAccount({ ...accountData.value, openid });
    store.dispatch("login/account", res);
  }
  elFormRef.value?.validate().then(async (valid) => {
    if (valid) {
      // 先判断验证码是否正确
      const authCode = store.state.authCode;
      if (authCode !== accountData.value.authCode) {
        message.error("验证码错误");
        accountData.value.authCode = "";
        authCodeRef.value?.refreshCode();
        return;
      }
      // console.log({ ...accountData.value, openid });
      // 发送登录请求
      const res = await httpAccount({ ...accountData.value, openid });
      if (res.code >= 1) {
        store.dispatch("login/account", res);
      } else {
        authCodeRef.value?.refreshCode();
        accountData.value.authCode = "";
        message.error(res.msg);
      }
    } else {
      message.show("请输入相关信息");
    }
  });
};

accountData.value.authCode = "";

// 监听路由
const route = useRoute();

watch(
  () => route,
  (val) => {
    const appid = (val?.query?.appid ?? "") as string;
    const code = (val?.query?.code ?? "") as string;
    const sns = (val?.query?.sns ?? "") as string;
    if (appid && code && sns) {
      useWxScanLogin({ appid, code, sns }).then((res) => {
        openid = res?.openid ?? "webopenid";
        if (res.code == 2) {
          message.messageBox("扫码登录结果", res.msg).then((res) => {
            isShowWxScanPanel.value = false;
          });
        } else if (res.code == 1) {
          accountData.value.csname = res.scname;
          accountData.value.cnstr = res.scname;
          accountData.value.sns = res.softname;
          accountData.value.uname = res.username;
          accountData.value.upwd = res.userpassword;
          handleLoginClick("wxcsan");
        }
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
@import "../css/login-box.less";
</style>
