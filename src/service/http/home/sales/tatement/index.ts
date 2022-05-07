import kbBaseRequest from "@/service";
import { IDataType } from "@/service/type";
// import { ITableType } from "./type";

// 获取销售对账单的数据
export const httpGetSalesStatementData = async (params: any) => {
  return kbBaseRequest.request({
    url: "/gorptsalestatement",
    params,
  });
};
