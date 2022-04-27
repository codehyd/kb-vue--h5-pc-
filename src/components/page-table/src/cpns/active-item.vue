<template>
  <div class="active-item">
    <template v-if="config.type == 'text'">
      <span @click="handleItemClick(config)" class="text">
        {{ config.text }}
      </span>
    </template>
    <template v-else-if="config.type == 'button'">
      <el-button @click="handleItemClick(config)">
        {{ config.text }}
      </el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ITableActiveConfigType } from "../../type";
const props = withDefaults(
  defineProps<{
    config?: ITableActiveConfigType;
  }>(),
  {
    config: () => {
      return {} as ITableActiveConfigType;
    },
  }
);

const emit = defineEmits(["menu-click"]);

const handleItemClick = (config: ITableActiveConfigType) => {
  emit("menu-click", { type: config.optionType, config });
};
</script>

<style lang="less" scoped>
.active-item {
  display: inline-block;
  .text {
    cursor: pointer;
    margin: 0 10px;
    &:hover {
      text-decoration: underline;
    }
  }
  .el-button {
    margin: 0 0 0 10px;
  }
}
</style>
