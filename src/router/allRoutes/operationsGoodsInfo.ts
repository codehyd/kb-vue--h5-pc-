const goodsInfo = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/goodsInfo/index.vue"
  );
export default {
  path: "/main/operations/goodsInfo",
  name: "operationsGoodsInfo",
  component: goodsInfo,
  children: [],
  meta: {
    title: "商品统计",
    // id: 103,
  },
};
