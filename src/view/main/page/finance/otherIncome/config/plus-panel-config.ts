import { IForm } from "@/base-ui/base-form";
import { useStore } from "@/store";
import { computed } from "vue";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state.selectOptions);

  const bildFormConfig: IForm = {
    formItems: [
      {
        type: "select", //选择
        field: "fjingshou",
        label: "经手人",
        options: dropDownList.value?.arrjingshouren ?? [],
      },
      {
        type: "date", //日期选择
        field: "fdate",
        label: "日期",
        otherOptions: {
          format: "YYYY/MM/DD",
          "value-format": "YYYY-MM-DD",
        },
        rules: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      {
        type: "select", //选择
        field: "fstyle",
        label: "收入方式",
        options: dropDownList.value?.arrshouruitem ?? [],

        rules: [
          {
            required: true,
            message: "请选择收入方式",
            trigger: "change",
          },
        ],
      },

      {
        type: "select", //选择
        field: "faccount",
        label: "银行账号",
        options: dropDownList.value?.arryinhangzhanghao ?? [],
      },
      {
        type: "number",
        field: "famount",
        label: "收入金额",
        rules: [
          {
            required: true,
            message: "收入金额不能为空",
          },
        ],
      },
      {
        type: "input",
        field: "fmemo",
        label: "备注",
      },
    ],
  };

  return {
    bildFormConfig,
  };
}
