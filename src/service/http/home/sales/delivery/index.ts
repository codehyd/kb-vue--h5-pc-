import kbBaseRequest from "@/service";
import { IDataType } from "@/service/type";
import { ITableType } from "./type";

// 获取销售送货单的列表头部数据
export const httpGetSalesDeliveryHeaderList = () => {
  return kbBaseRequest.request<IDataType>({
    url: "/gowebshowcolumn",
    params: {
      billtypeid: 1102,
    },
  });
};

// 获取销售送货单的表格数据
export const httpGetSalesDeliveryTableList = (params: ITableType) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gogetstockbilltotallist_page",
    params,
    data: {},
  });
};

export * from "./type";
