<template>
  <div>
    <h2>公告列表</h2>
    <div class="content">
      <template v-for="(item, index) in noticeList" :key="'notice' + item.fid">
        <div class="item card">
          <div class="item-title select">{{ item.title }}</div>
          <div class="item-content">{{ item.content }}</div>
          <a :href="item.url" target="_blank" class="item-url">
            {{ item.url }}
          </a>
        </div>
      </template>
      <template v-if="noticeList.length == 0">
        <div class="empty">
          <el-empty description="暂无数据" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import KbCard from "@/components/card";

import { useStore } from "@/store";
const store = useStore();

store.dispatch("home/getNoticeList");
const noticeList = computed(() => store.state.home.noticeList);
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  overflow-y: auto;
  .item {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    margin: 0 0 10px;
    .item-title {
      font-weight: 600;
    }
    .item-content {
      margin: 5px 0;
      line-height: 30px;
      text-indent: 2em;
    }
  }
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
