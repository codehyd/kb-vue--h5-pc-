import { IDataType } from "@/service/type";

export type IBillid = 103 | 101 | 102 | 105 | 4000 | 1 | 2 | 111 | 112 | 114;

export interface IBaseTableConfigType {
  billtypeid: IBillid;
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
  // flag: "select";
  page: number;
  Classid: number;
  tj?: string;
  count?: number;
}

export interface IStoreInquireType {
  page: number;
  classid: number;
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

export interface ISaveBildType {
  billtypeid: number | string;
  content: string | any;
}

export interface ITableType {
  billtypeid: IBillid;
  begdate: string;
  enddate: string;
  page: number;
  tj?: string;
  count?: number;
}
