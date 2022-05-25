import { IForm } from "@/base-ui/base-form";
import { useStore } from "@/store";
import { computed } from "vue";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state.selectOptions);

  const bildFormConfig: IForm = reactive({
    formItems: [
      {
        type: "kehu",
        field: "fcsname",
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
        field: "fjingshou",
        label: "经手人",
        // options: dropDownList.value?.arrjingshouren ?? [],
      },
      {
        type: "select", //选择
        field: "fyewuyuan",
        label: "业务员",
        // options: dropDownList.value?.arryewuyuan ?? [],
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
        field: "finstockno",
        label: "采购单号",
        options: [],
      },
      {
        type: "select", //选择
        field: "fstyle",
        label: "付款方式",
        // options: dropDownList.value?.arrshoukuanfangshi ?? [],
      },
      {
        type: "select", //选择
        field: "faccount",
        label: "银行账号",
        // options: dropDownList.value?.arryinhangzhanghao ?? [],
      },
      {
        type: "number",
        field: "famount",
        label: "付款金额",
        // 金额不等于空和不等于0的时候才能提交
        rules: [
          {
            required: true,
            message: "收款金额不能为空",
          },
        ],
      },
      {
        type: "input",
        field: "fmemo",
        label: "备注",
      },
    ],
  });

  watchEffect(() => {
    bildFormConfig.formItems[1].options =
      dropDownList.value?.arrjingshouren ?? [];
    bildFormConfig.formItems[2].options = dropDownList.value?.arryewuyuan ?? [];
    bildFormConfig.formItems[5].options =
      dropDownList.value?.arrshoukuanfangshi ?? [];
    bildFormConfig.formItems[6].options =
      dropDownList.value?.arryinhangzhanghao ?? [];
  });

  return {
    bildFormConfig,
  };
}
