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

export { baseUrl, getTaskBaseData };
