<template>
  <div :class="`form-item-${checkKey}`">
    <!-- 客户 -->
    <el-input
      v-if="type == 'kehu'"
      :class="[{ 'no-border': !border }]"
      :size="size"
      v-model="modelValue"
      disabled
      readonly
    >
      <template #suffix>
        <el-button :size="size" icon="search"> 选择客户</el-button>
      </template>
    </el-input>
    <!-- input 输入框 -->
    <el-input
      v-else-if="type == 'input'"
      :class="[{ 'no-border': !border }]"
      :size="size"
      v-model="modelValue"
      :disabled="disabled"
    >
    </el-input>

    <!-- select 选择框 -->
    <el-select v-else-if="type == 'select'" v-model="modelValue" :size="size">
      <el-option
        v-for="(option, index) in otherCheckList"
        :key="checkKey ? option[checkKey] : option"
        :label="checkKey ? option[checkKey] : option"
        :value="checkKey ? option[checkKey] : option"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: any;
    type?: "input" | "kehu" | "select" | "date";
    border?: boolean;
    disabled?: boolean;
    otherCheckList?: any;
    checkKey?: string;
  }>(),
  {
    checkKey: "",
    border: false,
    disabled: false,
    otherCheckList: () => {
      return [];
    },
  }
);

const size = "small";

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="less" scoped>
&:deep(.no-border .el-input__inner) {
  box-shadow: none;
}

// &:deep(.el-select) {
//   width: 100%;
// }
</style>
