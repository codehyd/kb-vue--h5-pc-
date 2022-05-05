import kbBaseRequest from "@/service";
import { IDataType } from "@/service/type";

// 获取热销单品的数据
export const httpGetHotGoodsData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptsaleproductrank",
    params,
  });
};

// 获取客户贡献的数据
export const httpGetCustomerContributeData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptsalecustomerrank",
    params,
  });
};

// 获取订单跟踪的数据
export const httpGetOrderTraceData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptsaleordertrace",
    params,
  });
};

// 获取应收账款的数据
export const httpGetReceivableData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptkehuqiankuan",
    params,
  });
};

// 获取应付账款的数据

export const httpGetPayableData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptyingfuzhangkuan",
    params,
  });
};

// 获取收发存的数据
export const httpGetStockData = (params: any) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gorptshoufacun",
    params,
  });
};
