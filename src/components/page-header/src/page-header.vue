<template>
  <div class="page-header">
    <div class="logo">
      <img :src="logoSrc" alt="" />
    </div>

    <div class="content">
      <div class="left">
        <nav-header></nav-header>
      </div>
      <div class="right">
        <kb-icon
          @click="handleNavSetting"
          name="setting"
          :size="18"
          flag="elIcon"
        ></kb-icon>
        <avatar-wrap style="margin: 0 0 0 10px"></avatar-wrap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KbIcon from "@/base-ui/icon";
import AvatarWrap from "./cpns/avatar-wrap.vue";
import NavHeader from "./cpns/nav-header.vue";

const emit = defineEmits(["menu-click"]);

const router = useRouter();

const logoSrc = ref("https://www.757abc.com/wxmp/img/weblogo.png");

const handleNavSetting = () => {
  router.push("/setup");
};
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
