import baseRequest from "./request";
import { baseUrl, getTaskBaseData, getTaskTokenData } from "./request/config";

import qs from "qs";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const KbBaseRequest = new baseRequest({
  baseURL: baseUrl,
  interceptors: {
    requestInterceptor: (config) => {
      if (config.method === "get") {
        config.params = {
          ...getTaskBaseData(),
          ...getTaskTokenData(),
          ...config.params,
        };
      } else if (config.method === "post") {
        config.data = qs.stringify({
          ...getTaskBaseData(),
          ...getTaskTokenData(),
          ...config.data,
        });
        // config.headers = { "content-type": "multipart/form-data" };
      }
      NProgress.start();
      return config;
    },
    responseInterceptor: (res) => {
      NProgress.done();
      return res;
    },
  },
});

export const kbUpdateRequest = new baseRequest({
  baseURL: baseUrl,
});

export default KbBaseRequest;
