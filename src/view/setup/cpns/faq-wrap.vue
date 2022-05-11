<template>
  <div class="faq-wrap">
    <h2>常用问题</h2>
    <template v-for="item in helpList" :key="item.fid">
      <div class="card item">
        <h4 class="select">{{ item.head }}</h4>
        <span>{{ item.body }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { httpGetSelectOptions } from "@/service/http/setup";

const helpList = ref<any[]>([]);

httpGetSelectOptions().then((res) => {
  helpList.value = res?.data?.[0]?.data ?? [];
});
</script>

<style lang="less" scoped>
.item {
  margin: 0 0 10px 0;
  h4 {
    margin: 0;
  }
  span {
    // 首行缩进2
    margin-left: 2em;
    line-height: 30px;
  }
}
</style>
