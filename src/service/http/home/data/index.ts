import kbBaseRequest from "@/service";

// 新增商品信息
export const httpAddGoods = (params: any) => {
  return kbBaseRequest.request({
    url: "/gosetproductsubmit",
    params,
  });
};

// 获取商品详情
export const httpGetGoodsInfo = (params: any) => {
  return kbBaseRequest.request({
    url: "/gogetproductone",
    params,
  });
};
