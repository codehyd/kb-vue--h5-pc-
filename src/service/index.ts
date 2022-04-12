import baseRequest from "./request";
import { baseUrl, getTaskBaseData } from "./request/config";

import store from "@/store";
const KbBaseRequest = new baseRequest({
  baseURL: baseUrl,
  interceptors: {
    requestInterceptor: (config) => {
      const newStore: any = store;
      const tokenData: any = {};
      const token = newStore.state.login.token;
      if ("code" in token) {
        tokenData.sns = token.softname;
        tokenData.csname = token.csname;
        tokenData.cnstr = token.csname;
        tokenData.uid = token.uid;
        tokenData.uname = token.uname;
        tokenData.upwd = token.upwd;
      }
      if (config.method === "get") {
        config.params = {
          ...tokenData,
          ...config.params,
          ...getTaskBaseData(),
        };
      } else if (config.method === "post") {
        config.data = {
          ...tokenData,
          ...config.data,
          ...getTaskBaseData(),
        };
      }

      return config;
    },
  },
});

export default KbBaseRequest;
