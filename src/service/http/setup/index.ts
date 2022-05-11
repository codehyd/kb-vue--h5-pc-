import kbBaseRequest from "@/service";

// 获取常用功能信息
export const httpGetSelectOptions = () => {
  return kbBaseRequest.request({
    url: "/kbwxgethelps",
  });
};
