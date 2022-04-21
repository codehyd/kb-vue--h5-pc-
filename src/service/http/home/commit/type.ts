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
