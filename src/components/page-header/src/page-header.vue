<template>
  <div class="page-header">
    <div class="logo" @click="handleLogoClick">
      <img :src="logoSrc" alt="" />
    </div>

    <div class="content">
      <div class="left">
        <nav-header></nav-header>
      </div>
      <div class="right">
        <!-- <el-switch
          @change="handleSwitchChange"
          style="margin: 0 10px"
          v-model="dark"
          inline-prompt
          active-text="暗"
          inactive-text="明"
        /> -->

        <el-tag effect="plain" style="margin: 0 10px 0 0">
          {{ token.csname }} - {{ token.softname }}
        </el-tag>
        <el-tag effect="dark" style="margin: 0 10px 0 0">
          {{ token.uname }}
        </el-tag>
        <kb-icon
          @click="handleNavSetting"
          name="setting"
          :size="20"
          flag="elIcon"
          color="#999"
        ></kb-icon>
        <avatar-wrap style="margin: 0 0 0 10px"></avatar-wrap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import KbIcon from "@/base-ui/icon";
import AvatarWrap from "./cpns/avatar-wrap.vue";
import NavHeader from "./cpns/nav-header.vue";

const emit = defineEmits(["menu-click"]);

const store = useStore();

const router = useRouter();

const logoSrc = ref("https://www.757abc.com/wxmp/img/weblogo.png");

onMounted(() => {
  toggleSrc();
  // 监听分辨率变化
  window.addEventListener("resize", () => {
    toggleSrc();
  });
  function toggleSrc() {
    const width = document.body.clientWidth;
    logoSrc.value =
      width >= 1024
        ? "https://www.757abc.com/wxmp/img/weblogo.png"
        : "https://www.757abc.com/wxmp/img/weblogo2.png";
  }
});

const handleNavSetting = () => {
  router.push("/setup");
};
const handleLogoClick = () => {
  router.push("/main");
};

const token = computed(() => store.state.login.token);

// console.log(token.value);

// const dark = ref(false);
// const handleSwitchChange = (val: boolean) => {
//   document.body.style.setProperty("--headerBgColor", !val ? "white" : "#000");
// };
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
