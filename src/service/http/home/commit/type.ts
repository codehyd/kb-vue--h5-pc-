import { IDataType } from "@/service/type";

export interface IBaseTableConfigType {
  billtypeid: string | number;
  billid: string | number;
}

export interface IDetailTableDataType extends IDataType {
  atturlarray: any;
  message: any;
}

export interface IBaseUpdateImageType extends IBaseTableConfigType {
  fileindex: number;
}

export interface IBaseMessageType extends IBaseTableConfigType {
  message: string;
}

export interface IGoodListType {
  flag: "select";
  page: number;
  Classid: number;
  tj?: string;
  count?: number;
}

export interface IClientListType {
  flag: "select";
  page: number;
  parentid: number;
  tj?: string;
  count?: number;
}

export interface IUseGoodPrice {
  billtypeid: number | string;
  color?: string;
  csid: string | number;
  modelids: string | number;
  pack?: string;
}
