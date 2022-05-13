import { IForm } from "@/base-ui/base-form";
import { useStore } from "@/store";
import { watchEffect, computed, ref } from "vue";
export default function () {
  const store = useStore();
  const dropList = computed(() => store.state.selectOptions);
  const yewuyuanArray = ref([]);
  const classList = ref([]);

  watchEffect(() => {
    yewuyuanArray.value = dropList.value?.arryewuyuan ?? [];
    classList.value = dropList.value?.arrcsfirstclass ?? [];
  });

  const plusFormConfig: IForm = {
    formItems: [
      {
        type: "input",
        field: "fname",
        label: "客户名称",
        placeholder: "请输入客户名称",
        rules: [
          {
            required: true,
            message: "客户名称不能为空",
          },
        ],
      },
      {
        type: "select",
        field: "fcstype",
        label: "客户类型",
        placeholder: "请选择客户类型",
        rules: [
          {
            required: true,
            message: "客户类型不能为空",
          },
        ],
        options: ["客户", "供应商"],
      },
      {
        type: "select",
        field: "ffirstclassname",
        label: "客户分类",
        placeholder: "请选择客户分类",
        options: classList.value,
        rules: [
          {
            required: true,
            message: "客户分类不能为空",
          },
        ],
      },
      {
        type: "input",
        field: "faddress",
        label: "客户地址",
        placeholder: "请输入客户地址",
      },
      {
        type: "input",
        field: "fbianma",
        label: "客户编码",
        placeholder: "请输入客户编码",
      },

      {
        type: "input",
        field: "fphone",
        label: "联系电话",
        placeholder: "请输入联系电话",
      },
      {
        type: "input",
        field: "flinker",
        label: "客户联系人",
        placeholder: "请输入客户联系人",
      },

      {
        type: "input",
        field: "flinkerphone",
        label: "手机号码",
        placeholder: "请输入手机号码",
      },
      {
        type: "select",
        field: "fyewuyuan",
        label: "业务员",
        placeholder: "请选择业务员",
        options: yewuyuanArray.value,
      },
      {
        type: "input",
        field: "findex",
        label: "排序顺序",
        placeholder: "请输入排序顺序 越小越靠前",
        rules: [
          {
            required: false,
            pattern: /^-?[1-9]\d*$/,
            message: "排序顺序不能为0",
          },
        ],
      },
      {
        type: "textarea",
        field: "fmemo",
        label: "备注",
        placeholder: "请输入备注",
        col: {
          span: 24,
        },
      },
    ],
  };
  return {
    plusFormConfig,
  };
}
