// setup设置
type classType = "pc-table" | "pc-wechat" | "pc-goods";
type formType =
  | "input"
  | "number"
  | "switch"
  | "checkbox"
  | "select"
  | "status";

// select 的 otherOptions 的list为列表  需要[item]
// checkbox 的 otherOptions 的list为列表  需要[{label}]

interface ISetupOptionType {
  id: string | number;
  label: string;
  value: string | number | boolean | any;
  type: formType;
  help?: string;
  field: string;
  otherOptions?: any;
}
interface ISetupType {
  label: string;
  class: classType;
  setup: ISetupOptionType[];
  icon?: string;
  flag?: string;
}

export const setupOptions: ISetupType[] = [
  {
    label: "表格与开单相关配置",
    class: "pc-table",
    flag: "elIcon",
    setup: [
      {
        id: "queryTableMaxHeight",
        label: "查询表格最大高度",
        value: 700,
        type: "number",
        help: "查询表格最大高度 默认700px",
        field: "queryTableMaxHeight",
        otherOptions: {
          min: 100,
        },
      },
      {
        id: "detailTableMaxHeight",
        label: "详情表格最大高度",
        value: 300,
        type: "number",
        help: "详情表格最大高度 默认300px",
        field: "detailTableMaxHeight",
        otherOptions: {
          min: 100,
        },
      },
      {
        id: "editTableMaxHeight",
        label: "开单表格最大高度",
        value: 700,
        type: "number",
        help: "开单编辑表格最大高度 默认700px",
        field: "edit",
        otherOptions: {
          min: 100,
        },
      },
      {
        id: "isAutoWidth",
        label: "表格是否自适应根据宽度设置",
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
      {
        id: "isOpenVirtualScroll",
        label: "是否开启性能表格优化",
        value: true,
        type: "switch",
        help: "开启后会优化表格的渲染",
        field: "isOpenVirtualScroll",
      },
      {
        id: "virtualScrollSize",
        label: "编辑表格占位行",
        value: 10,
        type: "number",
        help: "开启性能优化表格渲染后编辑表格需要设置占位行的个数 否则性能优化失败",
        field: "virtualScrollSize",
        otherOptions: {
          min: 1,
        },
      },
      {
        id: "count",
        label: "分页数量",
        value: 50,
        type: "number",
        help: "查询表格分页显示的数量",
        field: "count",
        otherOptions: {
          min: 20,
        },
      },
      {
        id: "isShowAuthMessage",
        label: "表单默认显示错误校验信息",
        value: true,
        type: "switch",
        help: "表单默认显示错误校验信息",
        field: "isShowAuthMessage",
      },
      {
        id: "defaultStore",
        label: "默认仓库设置",
        value: "",
        type: "select",
        help: "开单时默认仓库设置",
        field: "defaultStore",
        otherOptions: {
          placeholder: "默认的仓库设置",
        },
      },
      {
        id: "billingRedo",
        label: "开单时商品是否允许重复(默认允许)",
        value: true,
        type: "switch",
        help: "",
        field: "billingRedo",
        otherOptions: {
          disabled: true,
        },
      },
      {
        id: "billingStatus",
        label: "单据状态样式设置",
        value: [],
        type: "status",
        help: "自定义单据状态样式设置",
        field: "billingStatus",
        // otherOptions: {
        //   disabled: true,
        // },
      },
    ],
  },
  // {
  //   label: "表单相关设置",
  //   class: "pc-form",
  //   flag: "elIcon",
  //   icon: "SetUp",

  //   setup: [],
  // },
  {
    label: "微信通知",
    class: "pc-wechat",
    icon: "icon-weixin",
    flag: "",
    setup: [
      {
        id: "openWeChatMessage",
        label: "单据开启微信通知",
        value: [],
        type: "checkbox",
        help: "单据详情内开启微信通知功能(如果被禁用了这个功能则不会开启)",
        field: "openWeChatMessage",
        otherOptions: {
          list: [
            {
              label: "销售送货",
              id: 103,
              disabled: false,
            },
            {
              label: "销售订单",
              id: 102,
              disabled: true,
            },
          ],
        },
      },
    ],
  },
  {
    label: "基础资料相关配置",
    class: "pc-goods",
    icon: "Postcard",
    flag: "elIcon",
    setup: [
      {
        id: "goodCardPanel",
        label: "宫格布局显示",
        value: true,
        type: "switch",
        help: "商品资料和客户资料都会生效(开单时只有商品资料生效)",
        field: "goodCardPanel",
      },
    ],
  },
];
