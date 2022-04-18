import { IFormType } from "@/base-ui/form";

export const searchConfig: IFormType = {
  formItems: [
    {
      field: "tj",
      label: "检索内容",
      type: "input",
    },
    {
      field: "date",
      label: "时间范围",
      type: "date",
      otherDateType: "daterange",
    },
  ],
};
