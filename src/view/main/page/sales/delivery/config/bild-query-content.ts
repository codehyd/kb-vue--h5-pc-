import dayjs from "dayjs";
import { IBildQueryForm } from "@/components/bild-query-content";

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
