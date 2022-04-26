<template>
  <div class="base-form">
    <el-form ref="elFormRef" :model="modelValue" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :prop="item.field"
              :show-message="isShowAuthMessage"
              :class="{
                isShowMessage: !isShowAuthMessage,
              }"
            >
              <!-- input输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
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
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
                      选择客户
                    </el-button>
                  </template>
                </el-input>
              </template>
              <!-- date 日期 -->
              <template v-else-if="item.type === 'date'">
                <el-date-picker
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useFormSetup from "./hooks/useFormSetup";
import useFormMethods from "./hooks/useFormMethods";
import { IFormItem } from "../type";
const props = withDefaults(
  defineProps<{
    modelValue: any;
    labelWidth?: string;
    formItems?: IFormItem[];
    colLayout?: any;
  }>(),
  {
    labelWidth: "100px",
    formItems: () => [],
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

const emit = defineEmits(["update:modelValue", "kehu-click"]);

const { isShowAuthMessage } = useFormSetup();
const { elFormRef, validateForm } = useFormMethods();

const handleSelectClick = () => {
  emit("kehu-click");
};

// const autoColLayout = computed(() => {});

const handleValueChange = (value: any, field: string) => {
  console.log(value);
  emit("update:modelValue", { ...props.modelValue, [field]: value });
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
  margin: 0;
}
</style>
