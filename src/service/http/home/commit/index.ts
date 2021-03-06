import kbBaseRequest, { kbUpdateRequest } from "@/service";
import { IDataType } from "@/service/type";
import { getTaskBaseData, getTaskTokenData } from "@/service/request/config";

import {
  IBaseTableConfigType,
  IDetailTableDataType,
  IBaseUpdateImageType,
  IBaseMessageType,
  IGoodListType,
  IUseGoodPrice,
  IClientListType,
  ISaveBildType,
  IBillid,
  ITableType,
  IStoreInquireType,
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
    params: { ...params, ...{ flag: "select" } },
  });
};

// 通过编码获取商品信息
export const httpGetGoodsInfoByCode = (bianma: number | string) => {
  return kbBaseRequest.request({
    url: "/gogetproductbianma",
    params: {
      bianma,
    },
  });
};

// 获取用户价格
export const httpGetUserPrice = (params: IUseGoodPrice) => {
  return kbBaseRequest.request({
    url: "/gogetsourceprice_extend",
    params,
  });
};

// 获取客户Class列表
export const httpGetClientClassList = () => {
  return kbBaseRequest.request({
    url: "/gogetcustomerfirstclass",
  });
};

// 获取客户列表
export const httpGetClientList = (params: IClientListType) => {
  return kbBaseRequest.request({
    url: "/gogetcustomerdetail_page",
    params,
  });
};
// 获取存货查询
export const httpStoreInquire = (params: IStoreInquireType) => {
  return kbBaseRequest.request({
    url: "/gogetstockquery_page",
    params,
  });
};

// 提交保存 post
export const httpPostSave = (data: ISaveBildType | any) => {
  return kbBaseRequest.request({
    url: "/gosetbillsubmit_post",
    data: {
      flag: "web",
      ...data,
    },
    method: "POST",
  });
};

// 获取表格数据
export const httpGetTableData = (id: IBillid, params: ITableType) => {
  const urls = {
    103: "gogetstockbilltotallist_page",
    1: "gogetstockbilltotallist_page",
    2: "gogetstockbilltotallist_page",
    101: "gogetsalequotebilltotallist_page",
    102: "gogetsaleorderbilltotallist_page",
    105: "gogetstockbilltotallist_page",
    4000: "gogetproduceplanbilltotallist_page",
    111: "gogetprocureorderbilltotallist_page",
    112: "gogetstockbilltotallist_page",
    113: "gogetfukuanlist_page",
    114: "gogetstockbilltotallist_page",
    104: "gogetshoukuanlist_page",
    150: "gogetshouruzhichulist",
    151: "gogetshouruzhichulist",
  };
  return kbBaseRequest.request({
    url: "/" + urls[id],
    params: {
      ...params,
      // count: 2,
    },
  });
};

// 获取详情表格的数据
export const httpGetDetailTableData = (
  id: IBillid,
  params: IBaseTableConfigType
) => {
  const urls = {
    103: "gogetstockbilldetaillist",
    1: "gogetstockbilldetaillist",
    2: "gogetstockbilldetaillist",
    101: "gogetsalequotebilldetaillist",
    102: "gogetsaleorderbilldetaillist",
    105: "gogetstockbilldetaillist",
    4000: "gogetproduceplanbilldetaillist",
    111: "gogetprocureorderbilldetaillist",
    112: "gogetstockbilldetaillist",
    114: "gogetstockbilldetaillist",
  };
  return kbBaseRequest.request({
    url: "/" + urls[id],
    params,
  });
};

// 获取销售对账单数据
export const httpGetSaleCheckData = (params: any) => {
  return kbBaseRequest.request({
    url: "/gorptsalestatement",
    params,
  });
};

// 销售对账单打印
export const httpGetSaleCheckPrint = (params: any) => {
  return kbBaseRequest.request({
    url: "/gorptsalestatement",
    params,
  });
};

export const httpAccountToken = () => {
  return kbBaseRequest.request({
    url: "kbgetwxgzhaccesstoken4kb",
  });
};

export function httpWeixinAccountMessage(data: any) {
  return kbBaseRequest.request({
    url: "kbsendwxtz",
    data,
    method: "POST",
  });
}

// 获取收款单据价格
export const httpGetReceiptPrice = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetkhonebalance",
    params,
  });
};

// 获取采购单据价格
export const httpGetPurchasePrice = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetgysonebalance",
    params,
  });
};

// 获取收款单据
export const httpGetReceiptList = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetbill_list_havebalance",
    params,
  });
};
export * from "./type";
