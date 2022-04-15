import { IFormType } from "@/base-ui/form";

export interface ITodoOptionType {
  title: string;
  flag: 0 | 1 | 2;
  checked: boolean;
}

export const selectOptions = ref<ITodoOptionType[]>([
  {
    title: "未完成",
    flag: 0,
    checked: true,
  },
  {
    title: "已完成",
    flag: 1,
    checked: false,
  },
  {
    title: "全部",
    flag: 2,
    checked: false,
  },
]);

export const createTodoFormConfig = ref<IFormType>({
  formItems: [
    {
      field: "title",
      type: "input",
      label: "事项标题",
      rules: [
        {
          required: true,
          message: "请输入标题",
          trigger: "blur",
        },
      ],
    },
    {
      field: "content",
      type: "textarea",
      label: "事项内容",
      rules: [
        {
          required: true,
          message: "请输入内容",
          trigger: "blur",
        },
      ],
    },
    {
      field: "touser",
      type: "checkbox",
      label: "选择通知人",
    },
  ],
  inline: false,
  colLayout: {
    span: 24,
  },
  labelPosition: "top",
});
