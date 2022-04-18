<template>
  <el-form
    :label-position="labelPosition"
    :inline="inline"
    :model="modelValue"
    label-width="labelWidth"
    ref="elFormRef"
  >
    <!-- 行内模式 -->
    <template v-if="inline">
      <kb-form-item
        @query-click="handleQueryClick"
        v-for="item in formItems"
        :key="item.field"
        v-model="modelValue[item.field]"
        :itemConfig="item"
      ></kb-form-item>
    </template>
    <!-- 非行内模式 -->
    <template v-else>
      <el-row :gutter="gutter">
        <template v-for="item in formItems" :key="item.field">
          <el-col v-bind="colLayout">
            <kb-form-item
              @query-click="handleQueryClick"
              v-model="modelValue[item.field]"
              :itemConfig="item"
            ></kb-form-item>
          </el-col>
        </template>
      </el-row>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { IFormItemsType } from "./type";
import KbFormItem from "./cpns/form-item.vue";
import { ElForm } from "element-plus";
const props = withDefaults(
  defineProps<{
    modelValue: object;
    formItems?: IFormItemsType[];
    labelWidth?: string;
    inline?: boolean;
    colLayout?: object;
    gutter?: number;
    labelPosition?: "left" | "right" | "top";
  }>(),
  {
    formItems: () => [],
    labelWidth: "120px",
    inline: false,
    colLayout: () => {
      return {
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      };
    },
    gutter: 10,
    labelPosition: "left",
  }
);
const elFormRef = ref<InstanceType<typeof ElForm>>();

// 校验表单
const validateForm = () => {
  const elForm = elFormRef.value;
  if (!elForm) {
    return;
  }
  return elForm.validate();
};

const handleQueryClick = () => {
  console.log(props.modelValue);
};

defineExpose({
  modelValue: props.modelValue,
  validateForm,
});
</script>
