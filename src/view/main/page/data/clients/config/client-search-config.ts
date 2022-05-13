import { IForm } from "@/base-ui/base-form";
export const clientSearchConfig: IForm = {
  formItems: [
    {
      field: "tj",
      label: "检索内容",
      type: "input",
      col: {
        span: 24,
      },
      inputOptions: {
        search: true,
        appendText: "查询",
      },
    },
  ],
};
