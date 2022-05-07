import kbBaseRequest, { kbUpdateRequest } from "@/service";
import { getTaskBaseData, getTaskTokenData } from "@/service/request/config";

import qs from "qs";

// 新增商品信息
export const httpAddGoods = (params: any) => {
  return kbBaseRequest.request({
    url: "/gosetproductsubmit",
    params,
  });
};

// 获取商品详情
export const httpGetGoodsInfo = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetproductone",
    params,
  });
};

// 获取用户详情
export const httpGetUserInfo = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetcustomerone",
    params,
  });
};

// 请求上传图片

export const httpUploadImage = (file: any, reqData: any) => {
  const requestData = Object.assign(
    getTaskBaseData(),
    getTaskTokenData(),
    reqData
  );
  const requestUrl = qs.stringify(requestData);
  return kbUpdateRequest.request({
    url: "/kbuploadproductattachment?" + requestUrl,
    data: file,
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
  });
};

// 新增用户
export const httpAddUser = (params: any) => {
  return kbBaseRequest.request({
    url: "/gosetcustomersubmit",
    params,
  });
};
