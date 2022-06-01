import { IForm } from "@/base-ui/base-form";
import { IPageDesciptionType } from "@/components/page-description";
import { useStore } from "@/store";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state?.selectOptions ?? []);
  const bildFormConfig: IForm = reactive({
    formItems: [
      {
        type: "select", //选择
        field: "fchejian",
        label: "生产车间",
        // options: dropDownList.value?.arrchejian ?? [],
      },
      {
        type: "input",
        field: "fdingjin",
        label: "订金",
      },

      {
        type: "date", //日期选择
        field: "ffinishdate",
        label: "完成日期",
        otherOptions: {
          format: "YYYY/MM/DD",
          "value-format": "YYYY-MM-DD",
        },
      },
      {
        type: "date", //日期选择
        field: "fdate",
        label: "日期",
        otherOptions: {
          format: "YYYY/MM/DD",
          "value-format": "YYYY-MM-DD",
        },
        // defaultDateValue: [],
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
        col: {
          lg: 16,
          xl: 24,
        },
      },
    ],
  });

  watchEffect(() => {
    bildFormConfig.formItems[0].options = dropDownList.value?.arrchejian ?? [];
  });

  return {
    bildFormConfig,
  };
}
