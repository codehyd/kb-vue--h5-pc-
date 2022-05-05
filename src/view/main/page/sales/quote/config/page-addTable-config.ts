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
        type: "input",
        field: "flinker",
        label: "联系",
      },

      {
        type: "input",
        field: "fdingjin",
        label: "订金",
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
        field: "faddress",
        label: "地址",
      },
      {
        type: "select", //选择
        field: "fyewuyuan",
        label: "业务员",
        options: dropDownList.value?.arryewuyuan ?? [],
      },

      {
        type: "input",
        field: "fphone",
        label: "电话",
      },

      {
        type: "input",
        field: "fcontractno",
        label: "合同号",
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