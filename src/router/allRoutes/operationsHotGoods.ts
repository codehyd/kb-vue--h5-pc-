const hotGoods = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/hotGoods/index.vue"
  );
export default {
  path: "/main/operations/hotGoods",
  name: "operationsHotGoods",
  component: hotGoods,
  children: [],
  meta: {
    title: "热销单品",
    // id: 103,
  },
};
