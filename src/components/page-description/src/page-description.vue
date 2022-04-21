<template>
  <div class="page-descriptions">
    <el-row>
      <el-col v-for="item in config" :key="item.field" v-bind="colLayStyle">
        <div class="dataList">
          <div class="label">{{ item.label }}</div>
          <div class="content">
            {{ formatContent(data[item.field], item.custormKeys) }}
            <template
              v-if="
                formatContent(data[item.field], item.custormKeys) == '' ||
                formatContent(data[item.field], item.custormKeys) == ' '
              "
            >
              <span style="color: #d3d4d6">暂无{{ item.label }}信息</span>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { IPageDesciptionType } from "../type";
const props = withDefaults(
  defineProps<{
    title?: string;
    extra?: string;
    data?: object;
    config?: IPageDesciptionType[];
  }>(),
  {
    title: "",
    extra: "",
    data: () => {
      return {};
    },
    config: () => {
      return [] as IPageDesciptionType[];
    },
  }
);

const colLayStyle = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
};

const formatContent = (value: string, keys?: string[]) => {
  if (keys) {
    return keys.map((item) => props.data[item]).join(" ");
  }
  return value ?? "";
};
</script>

<style lang="less" scoped>
.page-descriptions {
  margin: 0 0 10px;
}

.dataList {
  display: flex;
  border: 1px solid #ebeef5;
  margin-left: -1px;
  margin-top: -1px;
  .label {
    width: 100px;
    padding: 8px 11px;
    background-color: #f5f7fa;
    border-right: 1px solid #ebeef5;
  }
  .content {
    padding: 8px 11px;

    flex: 1;
  }
}
</style>
