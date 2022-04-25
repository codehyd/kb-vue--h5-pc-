import { IFormType } from "@/base-ui/form";
import { useStore } from "@/store";
import { computed } from "vue";

export default function () {
  const store = useStore();
  const dropDownList: any = computed(() => store.state?.selectOptions ?? []);

  const bildFormConfig: IFormType = {
    formItems: [
      {
        type: "input",
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
        otherCheckList: dropDownList.value?.arrchepai ?? [],
      },
      {
        type: "date", //日期选择
        field: "fdate",
        label: "日期",
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
        otherCheckList: dropDownList.value?.arryewuyuan ?? [],
      },
      {
        type: "select", //选择
        field: "fsiji",
        label: "司机",
        otherCheckList: dropDownList.value?.arrsiji ?? [],
      },
      {
        type: "select", //选择
        field: "fstock",
        label: "仓库",
        otherCheckList: dropDownList.value?.arrstock ?? [],

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
        type: "input",
        field: "fmemo",
        label: "备注",
      },
    ],
    itemStyle: {},
  };

  return {
    bildFormConfig,
  };
}
