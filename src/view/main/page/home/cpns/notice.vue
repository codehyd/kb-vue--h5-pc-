<template>
  <div class="notice">
    <kb-card title="公告" :height="500">
      <div class="content">
        <template
          v-for="(item, index) in noticeList"
          :key="'notice' + item.fid"
        >
          <div class="item">
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
    </kb-card>
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
.notice {
  height: 500px;
}

.content {
  height: 100%;
  overflow-y: auto;
  .item {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
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
