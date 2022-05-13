import { IForm } from "@/base-ui/base-form";
export const goodSearchConfig: IForm = {
  formItems: [
    {
      field: "tj",
      label: "检索内容",
      type: "input",
      inputOptions: {
        search: true,
        appendText: "查询",
      },
      col: {
        span: 24,
      },
    },
  ],
};
