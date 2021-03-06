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
        type: "select", //选择
        field: "fdepartment",
        label: "部门",
        options: dropDownList.value?.arrdepartment ?? [],
      },
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
        type: "input",
        field: "fuse",
        label: "用途",
      },
      {
        type: "select", //选择
        field: "fiostyle",
        label: "进仓类型",
        options: dropDownList.value?.arrinstyle ?? [],
      },
      {
        type: "input",
        field: "fmemo",
        label: "备注",
        col: {
          xl: 12,
        },
      },
    ],
  });

  watchEffect(() => {
    bildFormConfig.formItems[0].options = dropDownList.value?.arrstock ?? [];
    bildFormConfig.formItems[1].options =
      dropDownList.value?.arrdepartment ?? [];
    bildFormConfig.formItems[2].options =
      dropDownList.value?.arrjingshouren ?? [];
    bildFormConfig.formItems[5].options = dropDownList.value?.arrinstyle ?? [];
  });

  return {
    bildFormConfig,
  };
}
