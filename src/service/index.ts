import baseRequest from "./request";
import { baseUrl, getTaskBaseData, getTaskTokenData } from "./request/config";

import qs from "qs";
import local from "@/utils/local";
import base64 from "@/utils/base64";

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

      return config;
    },
  },
});

export const kbUpdateRequest = new baseRequest({
  baseURL: baseUrl,
});

export default KbBaseRequest;
