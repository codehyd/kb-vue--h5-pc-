import { ITableActiveConfigType } from "@/components/page-table";
import { IPageDesciptionType } from "@/components/page-description";
import { VxeTablePropTypes } from "vxe-table";

export const tableActiveConfig: ITableActiveConfigType[] = [
  {
    type: "text",
    text: "详情",
    optionType: "detail",
  },
];

export const tableMenusConfig: VxeTablePropTypes.MenuConfig = {
  body: {
    options: [
      [
        { code: "print", name: "打印", visible: true, disabled: false },
        { code: "detail", name: "详情", visible: true, disabled: false },
        { code: "audit", name: "审核", visible: true, disabled: false },
        { code: "delete", name: "删除", visible: true, disabled: false },
        { code: "pay", name: "收款", visible: true, disabled: false },
      ],
    ],
  },
};

export const detailTableActiveConfig: ITableActiveConfigType[] = [
  {
    type: "button",
    text: "单据审核",
    buttonType: "primary",
    optionType: "audit",
  },
  {
    type: "button",
    text: "单据打印",
    buttonType: "primary",
    optionType: "print",
  },
  {
    type: "button",
    text: "单据打印",
    buttonType: "primary",
    optionType: "print",
  },
];

export const clientConfig: IPageDesciptionType[] = [
  {
    field: "fkhname",
    label: "客户",
    icon: "avatar",
  },
  {
    field: "fsiji",
    label: "司机",
  },
  {
    field: "fdate",
    label: "日期",
  },
  {
    field: "fcsaddress",
    label: "地址",
  },
  {
    field: "fchepai",
    label: "车牌",
  },
  {
    field: "fstock",
    label: "仓库",
  },
  {
    field: "fcslinker",
    label: "联系",
    custormKeys: ["fcslinker", "fcsphone"],
  },
  {
    field: "forderno",
    label: "订单号",
  },
  {
    field: "fcontractno",
    label: "合同号",
  },
  {
    field: "fyewuyuan",
    label: "业务员",
  },
  {
    field: "fauditor",
    label: "审核员",
  },
  {
    field: "fmemo",
    label: "备注",
  },
];
