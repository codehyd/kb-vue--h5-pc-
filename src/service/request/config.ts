import local from "@/utils/local";
import base64 from "@/utils/base64";

// vite 环境变量
let mode = import.meta.env.MODE;

// * mode == "development" 开发阶段
// * mode == "production" 打包上线

let baseUrl = "";

if (mode == "development") {
  baseUrl = "/api";
} else {
  baseUrl = "https://kbapi.dianlan8.com:7804/kbapi/rest";
}

const getTaskBaseData = () => {
  return {
    timestamp: Math.round(new Date().getTime() / 1000).toString(),
    sig: "8D5A815A0D79A3F0C2CCB556FFB08B27",
    qxid: "1",
    openid: "webopenid",
  };
};

const getTaskTokenData = () => {
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
  return tokenData;
};

export { baseUrl, getTaskBaseData, getTaskTokenData };
