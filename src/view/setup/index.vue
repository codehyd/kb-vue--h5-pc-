<template>
  <div class="setup">
    <el-container>
      <el-header class="elHeader">
        <page-header></page-header>
      </el-header>
      <el-container class="content">
        <div @click="handleGoBack" class="back">
          <!-- <kb-icon name="back" flag="elIcon"></kb-icon> -->
          返回
        </div>
        <setup-content></setup-content>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/page-header";
import SetupContent from "./cpns/setup-content.vue";

const router = useRouter();

const handleGoBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
.setup {
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  .elHeader {
    margin: 0;
    padding: 0;
  }
  .elAside {
    margin: 10px 0 0 0;
    width: auto;
  }
  .elMain {
    overflow-y: auto;
    height: calc(100vh - 60px);
  }
}

.el-tabs {
  height: calc(100% - 48px - 20px);
  padding: 0px 20px 20px;
  overflow: hidden;
  z-index: 99;
  background-color: white;
}
.tabWrap {
  height: calc(100% - 48px);
  overflow: hidden;
  overflow-y: auto;
}
.content {
  position: relative;
}
.back {
  position: absolute;
  bottom: 50px;
  right: 50px;
  z-index: 999;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 2px 0 8px #00000026;
  border-radius: 6px;
  cursor: pointer;
}
</style>
