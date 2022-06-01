import { IForm } from "@/base-ui/base-form";
import { IPageDesciptionType } from "@/components/page-description";
import { useStore } from "@/store";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state?.selectOptions ?? []);
  const bildFormConfig: IForm = reactive({
    formItems: [
      {
        type: "kehu",
        field: "kehu",
        label: "客户",
        rules: [
          {
            required: true,
            message: "客户不能为空",
          },
        ],
        readonly: true,
      },
      {
        type: "select", //选择
        field: "fyewuyuan",
        label: "业务员",
        // options: dropDownList.value?.arryewuyuan ?? [],
      },
      {
        type: "select", //选择
        field: "fstock",
        label: "仓库",
        // options: dropDownList.value?.arrstock ?? [],

        rules: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "change",
          },
        ],
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
          sm: 24,
          lg: 16,
          xl: 24,
        },
      },
    ],
  });

  watchEffect(() => {
    bildFormConfig.formItems[1].options = dropDownList.value?.arryewuyuan ?? [];
    bildFormConfig.formItems[2].options = dropDownList.value?.arrstock ?? [];
  });

  return {
    bildFormConfig,
  };
}
