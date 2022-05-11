<template>
  <div class="useWrap">
    <h2>用户信息</h2>
    <el-descriptions border>
      <el-descriptions-item label="用户名称">
        {{ token.uname }}
      </el-descriptions-item>
      <el-descriptions-item label="软件名称">
        {{ token.csname }}
      </el-descriptions-item>
      <el-descriptions-item label="到期日期">
        {{ token.csexpirydate }}
      </el-descriptions-item>
      <el-descriptions-item label="软件代码">
        <el-tag size="small">{{ token.csmininame }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="软件名称">
        {{ token.chinesename }}
      </el-descriptions-item>
      <el-descriptions-item label="提示信息">
        {{ token.cshint }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const store = useStore();

const token = computed(() => store.state.login.token);
console.log(token.value);
</script>

<style scoped></style>
