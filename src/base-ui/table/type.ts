import { VxeTablePropTypes } from "vxe-table";

export interface ITableConfigType {
  column?: any[];
  data?: any[];
  keyString: string;
  size?: "medium" | "small" | "mini";
  state?: "query" | "detail";
  showFooter?: boolean;
  showIndex?: boolean;
  showAction?: boolean;
  activeText?: string;
  menuConfig?: VxeTablePropTypes.MenuConfig;
}
