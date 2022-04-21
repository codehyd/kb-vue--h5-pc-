import kbBaseRequest, { kbUpdateRequest } from "@/service";
import { IDataType } from "@/service/type";
import { getTaskBaseData, getTaskTokenData } from "@/service/request/config";

import {
  IBaseTableConfigType,
  IDetailTableDataType,
  IBaseUpdateImageType,
  IBaseMessageType,
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

export * from "./type";
