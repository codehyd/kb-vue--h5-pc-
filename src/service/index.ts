import baseRequest from "./request";
import { baseUrl, getTaskBaseData } from "./request/config";

import qs from "qs";
import local from "@/utils/local";
import base64 from "@/utils/base64";

const KbBaseRequest = new baseRequest({
  baseURL: baseUrl,
  interceptors: {
    requestInterceptor: (config) => {
      const tokenData: any = {};
      const token = local.getCache("token2.x")
        ? base64.decodeToObj(local.getCache("token2.x"))
        : "";
      if (token) {
        tokenData.sns = token?.softname ?? "";
        tokenData.csname = token?.csname ?? "";
        tokenData.cnstr = token?.csname ?? "";
        tokenData.uid = token?.uid ?? "";
        tokenData.uname = token?.uname ?? "";
        tokenData.upwd = token?.upwd ?? "";
      }
      if (config.method === "get") {
        config.params = {
          ...tokenData,
          ...config.params,
          ...getTaskBaseData(),
        };
      } else if (config.method === "post") {
        config.data = qs.stringify({
          ...tokenData,
          ...config.data,
          ...getTaskBaseData(),
        });
        // config.headers = { "content-type": "multipart/form-data" };
      }

      return config;
    },
  },
});

export default KbBaseRequest;
