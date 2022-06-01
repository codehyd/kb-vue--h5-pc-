import dayjs from "dayjs";
import {
  IBildQueryForm,
  IBildQueryTable,
  IBildQueryDetailTable,
} from "@/components/bild-query-content";

export const searchConfig: IBildQueryForm = {
  searchFormConfig: {
    formItems: [
      {
        field: "tj",
        label: "检索内容",
        type: "input",
      },
      {
        field: "date",
        label: "时间范围",
        type: "daterange",
        otherOptions: {
          "range-separator": "至",
          "start-placeholder": "开始日期",
          "end-placeholder": "截止日期",
          "value-format": "YYYY-MM-DD",
        },
        defaultDateValue: [
          dayjs().startOf("month").format("YYYY-MM-DD"),
          dayjs().endOf("month").format("YYYY-MM-DD"),
        ],
      },
    ],
  },
  isShowQuery: true,
};

export const tableConfig: IBildQueryTable = {
  menuConfig: {
    body: {
      options: [
        [
          { code: "print", name: "打印", visible: true, disabled: false },
          { code: "detail", name: "详情", visible: true, disabled: false },
          { code: "audit", name: "审核", visible: true, disabled: false },
          { code: "delete", name: "删除", visible: true, disabled: false },
        ],
      ],
    },
  },
  tableActiveConfig: [
    {
      type: "text",
      text: "详情",
      optionType: "detail",
    },
    {
      type: "text",
      text: "打印",
      optionType: "print",
    },
    {
      type: "text",
      text: "审核",
      optionType: "audit",
    },
    {
      type: "text",
      text: "删除",
      optionType: "delete",
    },
  ],
};

export const detailTableConfig: IBildQueryDetailTable = {
  clientConfig: [
    {
      field: "fchejian",
      label: "车间",
      col: {
        lg: 6,
        // sm: 12,
      },
    },
    {
      field: "fdingjin",
      label: "订金",
      col: {
        lg: 6,
        // sm: 12,
      },
    },

    {
      field: "ffinishdate",
      label: "完成日期",
      col: {
        lg: 6,
        // sm: 12,
      },
    },
    {
      field: "fdate",
      label: "日期",
      col: {
        lg: 6,
        // sm: 12,
      },
    },
    {
      field: "fauditor",
      label: "审核员",
      col: {
        lg: 6,
        sm: 12,
      },
    },
    {
      field: "fmemo",
      label: "备注",
      col: {
        sm: 24,
        md: 24,
        lg: 18,
        xl: 18,
      },
    },
  ],
  status: [
    {
      field: "fbillstatus",
      successText: "已审核",
      successType: "success",
      failText: "未审核",
      failType: "danger",
    },
  ],
  active: [
    {
      type: "audit",
      text: "审核单据",
    },
    {
      type: "print",
      text: "打印单据",
    },
    {
      type: "anotherList",
      text: "再来一单",
    },
  ],
};
