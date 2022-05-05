<template>
  <div class="page-form">
    <kb-form ref="kbFormRef" v-model="formData" v-bind="formConfig"></kb-form>
  </div>
</template>

<script setup lang="ts">
import KbForm, { IFormType } from "@/base-ui/form";
import message from "@/utils/message";
const props = withDefaults(
  defineProps<{
    formConfig: IFormType;
    defaultData?: any;
    isHasConfirm?: boolean;
  }>(),
  {
    defaultData: () => {},
  }
);
const kbFormRef = ref<InstanceType<typeof KbForm>>();

// 初始化
const formItems = props.formConfig?.formItems ?? [];
const formOriginData: any = {};
// 1. 获取表单项的原始值
for (const item of formItems) {
  if (item.type === "checkbox") {
    formOriginData[item.field] = [];
  } else if (item.type == "number") {
    formOriginData[item.field] = 0;
  } else {
    formOriginData[item.field] = "";
  }
}
if (props.isHasConfirm) {
  const find = formItems.find(
    (item) => item.field === "confirm" && item.otherButtonText === "查询"
  );
  if (!find) {
    formItems.push({
      field: "confirm",
      type: "button",
      label: "确认",
      otherButtonText: "查询",
    });
  }
}
const formData = ref(formOriginData);

// 获取表单数据方法 并且在获取前校验 如果校验失败则返回false
const getFormData = () => {
  return new Promise((resolve, reject) => {
    kbFormRef.value
      ?.validateForm()
      ?.then((validata) => {
        resolve(kbFormRef.value?.modelValue);
      })
      .catch((err) => {
        console.log(err);
        message.show("请输入相关信息");
        reject(err);
      });
  });
};

watchEffect(() => {
  if (props.defaultData) {
    for (const item of props.formConfig?.formItems ?? []) {
      formData.value[item.field] = props.defaultData[item.field];
    }
  }
});

defineExpose({
  getFormData, // 获取表单数据
});
</script>

<style scoped></style>
