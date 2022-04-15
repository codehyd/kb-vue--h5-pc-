<template>
  <el-form-item
    :rules="itemConfig.rules"
    v-if="itemConfig"
    :label="itemConfig.label"
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
  </el-form-item>
</template>

<script setup lang="ts">
import { IFormItemsType } from "../type";

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
const emit = defineEmits(["update:modelValue"]);

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

  emit("update:modelValue", value, field);
};
</script>

<style scoped></style>
