import { VxeTablePropTypes } from "vxe-table";
export type ImodeType = "query" | "detail" | "edit";

export interface ITableConfigType {
  column?: any[];
  data?: any[];
  keyString: string;
  size?: "medium" | "small" | "mini";
  state?: ImodeType;
  showFooter?: boolean;
  showIndex?: boolean;
  showAction?: boolean;
  activeText?: string;
  menuConfig?: VxeTablePropTypes.MenuConfig;
  veifyConfig?: object;
  showSelect?: boolean;
}
