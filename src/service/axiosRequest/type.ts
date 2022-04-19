import { AxiosRequestConfig, AxiosResponse } from "axios";
let BASE_URL = "";
let wxBaseUrl = "";
const sig = "8D5A815A0D79A3F0C2CCB556FFB08B27";
const TIME_OUT = 10000;

let wxRequestUrl = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
  wxBaseUrl = "/wxapi";
  wxRequestUrl = "https://t.dianlan8.com/#/wxlogin?appid=";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://kbapi.dianlan8.com:7804/kbapi/rest";
  wxBaseUrl = "https://api.weixin.qq.com";
  wxRequestUrl = "https://t.dianlan8.com/#/wxlogin?appid=";
} else {
  BASE_URL = "https://kbapi.dianlan8.com:7804/kbapi/rest";
  wxBaseUrl = "https://api.weixin.qq.com";
  wxRequestUrl = "https://t.dianlan8.com/#/wxlogin?appid=";
}

// axios实例 | 拦截器
export interface moreConfig extends AxiosRequestConfig {
  interceptors?: requestInterceptor;
}

export interface requestInterceptor {
  // 拦截成功 | 请求拦截前 (可以在发送请求前对发送的数据做一些事情 比如修改config 或发送给网络请求发送请求头)
  interceptorSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 拦截失败
  interceptorFail?: (error: any) => any;
  // 响应成功
  responseSuccess?: (res: AxiosResponse) => AxiosResponse;
  // 响应失败
  responseFail?: (error: any) => any;
}

export { BASE_URL, TIME_OUT, wxBaseUrl, sig, wxRequestUrl };

type resDataType = "success" | "warning" | "info" | "error";

export interface IDataType<T = any> {
  code: number;
  res: any;
  type?: resDataType;
  msg: string;
  data: T;
}
