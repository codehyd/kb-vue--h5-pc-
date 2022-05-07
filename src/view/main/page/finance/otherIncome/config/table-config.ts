import { ITableConfigType } from "@/base-ui/table";

export const tableConfig: ITableConfigType = reactive({
  keyString: "",
  isShowPage: true,
  loading: true,
  menuConfig: {
    body: {
      options: [
        [
          { code: "print", name: "打印", visible: true, disabled: false },
          { code: "audit", name: "审核", visible: true, disabled: false },
          { code: "delete", name: "删除", visible: true, disabled: false },
        ],
      ],
    },
  },
  tableActiveConfig: [
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
});
