import { ITableConfigType } from "@/base-ui/table";

// 表格操作列选项
export interface ITableActiveConfigType {
  type: "text" | "button";
  text: string;
  icon?: string;
  buttonType?: "primary" | "success" | "warning" | "danger" | "info";
  isConfirm?: boolean;
  optionType: string;
}

export interface IDetailTableConfig extends ITableConfigType {
  messages?: any;
  images?: any;
}

export interface IEditTableConfig extends ITableConfigType {
  current?: any;
}

export interface IGoodTableConfig extends ITableConfigType {
  Classid: number;
  classList?: any;
  page: number;
  tj?: string;
}

export interface IClientTableConfig extends ITableConfigType {
  parentid: number;
  classList?: any;
  page: number;
  tj?: string;
}
