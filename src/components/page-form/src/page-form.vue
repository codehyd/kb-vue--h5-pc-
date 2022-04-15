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
  } else {
    formOriginData[item.field] = "";
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
  getFormData,
});
</script>

<style scoped></style>
