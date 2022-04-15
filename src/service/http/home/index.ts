import kbBaseRequest from "@/service";
import { IDataType } from "../../type";
import {
  IBillDatatype,
  ISalesDataType,
  ITodoDataType,
  ISetTodoDataType,
  ITodoOptionsType,
  ITodoConfirmDataType,
} from "./type";

// 获取账单类型列表
export const httpGetBilltypeList = (params: IBillDatatype) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gogetuserbilllist",
    params,
  });
};

// 获取销售数据
export const httpGetSalesData = (params: ISalesDataType) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gogetmainpagedata",
    params,
  });
};

// 获取待办事项
export const httpGetTodoListData = (params: ITodoDataType) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gogetannevents",
    params,
  });
};

// 设置待办事项
export const httpSetTodoListData = (params: ISetTodoDataType) => {
  console.log(params);
  return kbBaseRequest.request<IDataType>({
    url: "/gosetanneventsubmit",
    params,
  });
};

// 删除待办事项
export const httpDelTodoListData = (params: ITodoOptionsType) => {
  return kbBaseRequest.request<IDataType>({
    url: "/godeleteannevents",
    params,
  });
};

// 完成待办事项
export const httpFinishTodoListData = (params: ITodoOptionsType) => {
  return kbBaseRequest.request<IDataType>({
    url: "/gofinishannevents",
    params,
  });
};

// 确认待办事项
export const httpConfirmTodoListData = (params: ITodoOptionsType) => {
  return kbBaseRequest.request<ITodoConfirmDataType>({
    url: "/goconfirmannevents",
    params,
  });
};
