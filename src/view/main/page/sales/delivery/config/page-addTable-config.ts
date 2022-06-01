import { IForm } from "@/base-ui/base-form";
// import { IPageDesciptionType } from "@/components/page-description";
import { useStore } from "@/store";
// import { getDay } from "@/utils/timer";

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
        type: "input",
        field: "flinker",
        label: "联系",
      },
      {
        type: "select", //选择
        field: "fchepai",
        label: "车牌",
        // options: dropDownList.value?.arrchepai ?? [],
      },
      {
        type: "date", //日期选择
        field: "fdate",
        label: "日期",
        otherOptions: {
          format: "YYYY/MM/DD",
          "value-format": "YYYY-MM-DD",
        },
        // defaultDateValue值为今天 格式为yyyy-MM-dd
        // defaultDateValue: getDay(),
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
        // options: dropDownList.value?.arryewuyuan ?? [],
      },
      {
        type: "select", //选择
        field: "fsiji",
        label: "司机",
        // options: dropDownList.value?.arrsiji ?? [],
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
        type: "input",
        field: "fphone",
        label: "电话",
      },
      {
        type: "input",
        field: "forderno",
        label: "订单号",
      },
      {
        type: "input",
        field: "fcontractno",
        label: "合同号",
      },
      {
        type: "number",
        field: "fwholebillreduceamount",
        label: "整单优惠",
      },
      {
        type: "input",
        field: "fmemo",
        label: "备注",
        col: {
          span: 24,
        },
      },
    ],
  });

  watchEffect(() => {
    bildFormConfig.formItems[2].options = dropDownList.value?.arrchepai ?? [];
    bildFormConfig.formItems[5].options = dropDownList.value?.arryewuyuan ?? [];
    bildFormConfig.formItems[6].options = dropDownList.value?.arrsiji ?? [];
    bildFormConfig.formItems[7].options = dropDownList.value?.arrstock ?? [];
  });

  return {
    bildFormConfig,
  };
}
