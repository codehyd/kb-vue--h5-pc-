<template>
  <div class="base-form">
    <el-form
      @submit.native.prevent
      :inline="inline"
      ref="elFormRef"
      :model="modelValue"
      :label-width="labelWidth"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="formatColBind(item)">
            <el-form-item
              :style="itemStyle"
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :prop="item.field"
              :show-message="isShowAuthMessage"
              :class="{
                isShowMessage: !isShowAuthMessage && isHideErrorMargin,
              }"
            >
              <!-- input输入框 -->
              <template
                v-if="
                  item.type === 'input' ||
                  item.type === 'password' ||
                  item.type == 'textarea'
                "
              >
                <el-input
                  :type="item.type"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model.trim="modelValue[`${item.field}`]"
                  @keyup.enter.native="handleSearchClick"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <template #append v-if="item.inputOptions?.search">
                    <el-button @click="handleSearchClick" icon="search">
                      {{ item.inputOptions?.appendText ?? "搜索" }}
                    </el-button>
                  </template>
                </el-input>
              </template>
              <template v-else-if="item.type === 'number'">
                <el-input-number
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <!-- select选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </el-option>
                </el-select>
              </template>
              <!-- date 日期选择 -->
              <template
                v-else-if="item.type === 'daterange' || item.type === 'date'"
              >
                <el-date-picker
                  :type="item.type"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :shortcuts="item.type === 'daterange' ? dateShortcuts : []"
                ></el-date-picker>
              </template>
              <!-- kehu 客户选择 -->
              <template v-else-if="item.type === 'kehu'">
                <el-input
                  class="kehu-input"
                  :placeholder="item.placeholder"
                  v-model="modelValue[`${item.field}`]"
                  disabled
                >
                  <template #append>
                    <el-button
                      @click="handleSelectClick"
                      type="primary"
                      round
                      icon="search"
                    >
                    </el-button>
                  </template>
                </el-input>
              </template>
            </el-form-item>
          </el-col>
        </template>
        <slot name="option"></slot>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useFormSetup from "./hooks/useFormSetup";
import useFormMethods from "./hooks/useFormMethods";
import { IFormItem } from "../type";
import { dateShortcuts } from "./config";
const props = withDefaults(
  defineProps<{
    modelValue: any;
    labelWidth?: string;
    formItems?: IFormItem[];
    colLayout?: any;
    inline?: boolean;
    itemStyle?: object;
    isHideErrorMargin?: boolean;
  }>(),
  {
    labelWidth: "100px",
    inline: false,
    isHideErrorMargin: false,
    formItems: () => {
      return [];
    },
    itemStyle: () => {
      return {};
    },
    colLayout: () => {
      return {
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      };
    },
  }
);

const emit = defineEmits(["update:modelValue", "kehu-click", "search-click"]);

// console.log(props);
const { isShowAuthMessage } = useFormSetup();
const { elFormRef, validateForm } = useFormMethods();

const handleSelectClick = () => {
  emit("kehu-click");
};

const autoColLayout = computed(() => {
  // 判断是否为行内模式 如果是行内模式则返回 {} 如果不是则返回对应的colLayout
  return props.inline ? {} : props.colLayout;
});

const handleValueChange = (value: any, field: string) => {
  // console.log(value);
  emit("update:modelValue", { ...props.modelValue, [field]: value });
};

const formatColBind = (item: any) => {
  if (item.col) return item.col;
  return props.colLayout;
};

const handleSearchClick = () => {
  emit("search-click");
};

defineExpose({
  validateForm,
});
</script>

<style lang="less" scoped>
.kehu-input {
  &:deep(.el-input-group__append) {
    box-shadow: none;
    background-color: transparent;
  }
}
.isShowMessage {
  margin: 0 0 -1px 0;
}
</style>
