import { ITableConfigType } from "@/base-ui/table";
import { IPageDesciptionType } from "../page-description/type";

// 表格操作列选项
export interface ITableActiveConfigType {
  type: "text" | "button";
  text: string;
  icon?: string;
  buttonType?: "primary" | "success" | "warning" | "danger" | "info";
  isConfirm?: boolean;
  optionType: string;
}

export type activeType = "audit" | "print" | "anotherList" | "checkPrint";
export interface IBildActiveType {
  text: string;
  type: activeType;
}

export interface IBildStatusType {
  field: string;
  successType?: "success" | "warning" | "danger" | "info" | "";
  successText?: string;
  failType?: "success" | "warning" | "danger" | "info" | "";
  failText?: string;
}

export interface IDetailTableConfig extends ITableConfigType {
  messages?: any;
  images?: any;
  clientConfig?: IPageDesciptionType[];
  status?: IBildStatusType[];
  active?: IBildActiveType[];
  title?: string;
}

export interface IEditTableConfig extends ITableConfigType {
  current?: any;
}

export interface IGoodTableConfig extends ITableConfigType {
  Classid: number;
  classList?: any;
  page: number;
  tj?: string;
  // flag: "select";
}

export interface IClientTableConfig extends ITableConfigType {
  parentid: number;
  classList?: any;
  page: number;
  tj?: string;
}

export interface IStoreinquireConfig extends ITableConfigType {
  classid: number;
  classList?: any;
  page: number;
  tj?: string;
}

export interface IHasTimerOrTj extends ITableConfigType {
  begdate: string;
  enddate: string;
  page?: number;
  tj?: string;
}
