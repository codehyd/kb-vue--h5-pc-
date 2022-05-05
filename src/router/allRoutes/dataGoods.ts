const goods = () =>
  import(/*webpackChunkName: "data*/ "@/view/main/page/data/goods/index.vue");
export default {
  path: "/main/data/goods",
  name: "dataGoods",
  component: goods,
  children: [],
  meta: {
    title: "商品资料",
    // id: 103,
  },
};
