import kbBaseRequest, { kbUpdateRequest } from "@/service";
import { IDataType } from "@/service/type";
import { getTaskBaseData, getTaskTokenData } from "@/service/request/config";

import {
  IBaseTableConfigType,
  IDetailTableDataType,
  IBaseUpdateImageType,
  IBaseMessageType,
  IGoodListType,
} from "./type";

import qs from "qs";

// 获取单据详情数据
export const httpGetDetailBild = (params: IBaseTableConfigType) => {
  return kbBaseRequest.request<IDetailTableDataType>({
    url: "/gogetstockbilldetaillist",
    params,
  });
};

// 审核
export const httpAuditBild = (params: IBaseTableConfigType) => {
  return kbBaseRequest.request({
    url: "/goauditbill",
    params,
  });
};

// 打印
export const httpPrintBild = (params: IBaseTableConfigType) => {
  return kbBaseRequest.request({
    url: "/goprintbill_web",
    params,
  });
};

// 删除
export const httpDeleteBild = (params: IBaseTableConfigType) => {
  return kbBaseRequest.request({
    url: "/godeletebill",
    params,
  });
};

// 添加图片
export const httpUpdateImage = (file: any, reqData: IBaseUpdateImageType) => {
  const requestData = Object.assign(
    getTaskBaseData(),
    getTaskTokenData(),
    reqData
  );
  const requestUrl = qs.stringify(requestData);
  return kbUpdateRequest.request({
    url: "/kbuploadbillattachment?" + requestUrl,
    data: file,
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
  });
};

// 提交留言
export const httpSubmitMessage = (params: IBaseMessageType) => {
  return kbBaseRequest.request({
    url: "/gosetbillmessage",
    params,
  });
};

// 获取edit表格的头部数据
export const httpGetEditTableColumn = (billtypeid: number) => {
  return kbBaseRequest.request({
    url: "/gowebeditcolumn",
    params: {
      billtypeid,
    },
  });
};

// 通过barcode 获取商品信息
export const httpGetGoodsInfoByBarcode = (barcode: number | string) => {
  return kbBaseRequest.request({
    url: "/gogetproductbarcode",
    params: {
      barcode,
    },
  });
};

// 获取show表格的头部数据
export const httpGetShowTableColumn = (billtypeid: number) => {
  return kbBaseRequest.request({
    url: "/gowebshowcolumn",
    params: {
      billtypeid,
    },
  });
};

// 获取good表格的class列表
export const httpGetGoodsClassList = () => {
  return kbBaseRequest.request({
    url: "/gogetproductfirstclass",
  });
};

// 获取good表格的商品列表
export const httpGetGoodsList = (params: IGoodListType) => {
  return kbBaseRequest.request({
    url: "/gogetproductdetail_page",
    params,
  });
};

export * from "./type";