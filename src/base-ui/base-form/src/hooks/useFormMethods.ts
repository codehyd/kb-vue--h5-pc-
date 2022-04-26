import { ElForm } from "element-plus";

export default function () {
  const elFormRef = ref<InstanceType<typeof ElForm>>();

  // 校验表单
  const validateForm = () => {
    return new Promise((resolve) => {
      elFormRef.value.validate((isValid: boolean) => {
        resolve(isValid);
      });
    });
  };

  return {
    elFormRef,
    validateForm,
  };
}
