import { IForm } from "@/base-ui/base-form";
import { IPageDesciptionType } from "@/components/page-description";
import { useStore } from "@/store";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state?.selectOptions ?? []);
  const bildFormConfig: IForm = {
    formItems: [
      {
        type: "kehu",
        field: "kehu",
        label: "供应商",
        rules: [
          {
            required: true,
            message: "供应商不能为空",
          },
        ],
        readonly: true,
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
