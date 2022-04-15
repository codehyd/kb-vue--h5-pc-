import { IDataType } from "@/service/type";

export interface IBillDatatype {
  flag: "day" | "week" | "month" | "all";
}

export interface ISalesDataType {
  flag: "week" | "month" | "lastmonth" | "year" | "lastyear";
}

export interface ITodoDataType {
  flag: 0 | 1 | 2;
}

export interface ISetTodoDataType {
  id: number;
  title: string;
  content: string;
  touser?: string;
}

export interface ITodoOptionsType {
  id: number;
}

export interface ITodoConfirmDataType extends IDataType {
  confirm: string;
}
