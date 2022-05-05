import { IForm } from "@/base-ui/base-form";

import dayjs from "dayjs";
export const customerSearchConfig: IForm = {
  formItems: [
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
};
