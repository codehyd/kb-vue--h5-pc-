<template>
  <el-form-item
    :rules="itemConfig.rules"
    v-if="itemConfig"
    :label="itemConfig.type == 'button' ? '' : itemConfig.label"
    :prop="itemConfig.field"
  >
    <!-- 输入框 -->
    <template
      v-if="
        itemConfig.type == 'input' ||
        itemConfig.type == 'password' ||
        itemConfig.type == 'textarea'
      "
    >
      <el-input
        v-model="modelValue"
        @update:modelValue="handleChangeValue($event, itemConfig.field)"
        :type="itemConfig.type"
      ></el-input>
    </template>

    <!-- 多选框checkbox -->
    <template v-if="itemConfig.type == 'checkbox'">
      <!-- 全选 -->
      <div>
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange($event, itemConfig)"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="modelValue"
          @update:modelValue="
            handleChangeValue($event, itemConfig.field, itemConfig)
          "
        >
          <el-checkbox
            v-for="item in itemConfig.otherCheckList"
            :key="item"
            :label="item"
          >
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </template>

    <!-- 日期 -->
    <template v-if="itemConfig.type == 'date'">
      <el-date-picker
        v-model="modelValue"
        :type="itemConfig.otherDateType"
        unlink-panels
        range-separator="To"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        @update:modelValue="
          handleChangeValue($event, itemConfig.field, itemConfig)
        "
      />
    </template>

    <!-- 按钮 -->
    <template v-if="itemConfig.type == 'button'">
      <el-button @click="handleBtnClick">
        {{ itemConfig.otherButtonText }}
      </el-button>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { IFormItemsType } from "../type";
import { shortcuts } from "../config/date-config";
import { timeConvert } from "@/utils/timer";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    itemConfig?: IFormItemsType;
  }>(),
  {
    itemConfig: () => {
      return {} as IFormItemsType;
    },
  }
);
const emit = defineEmits(["update:modelValue", "query-click"]);

// 多选框
const checkAll = ref(false);
const handleCheckAllChange = (val: boolean, item: IFormItemsType) => {
  emit("update:modelValue", val ? item.otherCheckList : []);
  // isIndeterminate.value = false;
};

const handleChangeValue = (
  value: any,
  field: string,
  item?: IFormItemsType
) => {
  // 多选框
  if (item?.type === "checkbox") {
    let allOptionsLength = item!.otherCheckList?.length ?? 0;
    checkAll.value = value.length == allOptionsLength;
  }
  // 日期选择
  else if (item?.type === "date") {
    if (item?.otherDateType === "daterange") {
      value = value.map(timeConvert);
    }
  }

  emit("update:modelValue", value, field);
};

// 点击查询
const handleBtnClick = () => {
  emit("query-click");
};
// const shortcuts = [
//   {
//     text: "Last week",
//     value: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
//       return [start, end];
//     },
//   },
//   {
//     text: "Last month",
//     value: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
//       return [start, end];
//     },
//   },
//   {
//     text: "Last 3 months",
//     value: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
//       return [start, end];
//     },
//   },
// ];
</script>

<style scoped>
:deep(.el-range-editor.el-input__inner) {
  width: 100%;
}
</style>
