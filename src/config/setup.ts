// setup设置
type classType = "pc-table";
type formType = "input" | "number" | "switch";

interface ISetupOptionType {
  id: string | number;
  label: string;
  value: string | number | boolean;
  type: formType;
  help?: string;
  field: string;
}
interface ISetupType {
  label: string;
  class: classType;
  setup?: ISetupOptionType[];
}

export const setupOptions: ISetupType[] = [
  {
    label: "表格相关设置",
    class: "pc-table",
    setup: [
      {
        id: "queryTableMaxHeight",
        label: "查询表格最大高度",
        value: 700,
        type: "number",
        help: "查询表格最大高度 默认700px",
        field: "queryTableMaxHeight",
      },
      {
        id: "detailTableMaxHeight",
        label: "详情表格最大高度",
        value: 700,
        type: "number",
        help: "详情表格最大高度 默认700px",
        field: "detailTableMaxHeight",
      },
      {
        id: "isAutoWidth",
        label: "表格是否根据宽度设置",
        value: true,
        type: "switch",
        help: "是否根据表格的设置宽度设置表格 如果设置为true 则表格宽度会根据宽度自适应",
        field: "isAutoWidth",
      },
      {
        id: "isShowOverFlow",
        label: "表格内容一行显示",
        value: true,
        type: "switch",
        help: "当表格的内容过长时显示为省略号",
        field: "isShowOverFlow",
      },
    ],
  },
];
