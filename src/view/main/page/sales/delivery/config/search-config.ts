import { IForm } from "@/base-ui/base-form";
import { dayjs } from "element-plus";

export const searchConfig: IForm = {
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
        // 默认值为当前月第一天和最后一天的	 YYYY-MM-DD格式
        "default-value": [
          dayjs().startOf("month").format("YYYY-MM-DD"),
          dayjs().endOf("month").format("YYYY-MM-DD"),
        ],
      },
      defaultDateValue: [
        dayjs().startOf("month").format("YYYY-MM-DD"),
        dayjs().endOf("month").format("YYYY-MM-DD"),
      ],
    },
  ],
};
