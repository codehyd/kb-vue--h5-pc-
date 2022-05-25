<template>
  <div class="home">
    <sales-data></sales-data>
    <kanban-data></kanban-data>
    <!-- custorm -->
    <el-row :gutter="10" class="custormRow">
      <el-col class="custormListCol" v-bind="custormColLeft">
        <custorm-list></custorm-list>
        <tip-message></tip-message>
      </el-col>
      <el-col v-bind="custormColRight">
        <todo-list></todo-list>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import SalesData from "./cpns/sales-data.vue";
import TipMessage from "./cpns/tip-message.vue";
import CustormList from "./cpns/custorm-list.vue";
import TodoList from "./cpns/todo-list.vue";
import KanbanData from "./cpns/kanban-data.vue";
import Notice from "./cpns/notice.vue";

const custormColLeft = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 15,
  xl: 15,
};
const custormColRight = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 9,
  xl: 9,
};
</script>

<style lang="less" scoped>
.custormRow {
  margin-bottom: 10px;
  height: 100%;
}
// 媒体查询custormListCol到1024以下时的样式
@media (max-width: 1024px) {
  .custormListCol {
    margin-bottom: 10px;
  }
}
</style>
