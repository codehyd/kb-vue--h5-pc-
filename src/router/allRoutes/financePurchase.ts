const purchase = () =>
  import(
    /*webpackChunkName: "finance*/ "@/view/main/page/finance/purchase/index.vue"
  );
export default {
  path: "/main/finance/purchase",
  name: "financePurchase",
  component: purchase,
  children: [],
  meta: {
    title: "采购付款",
    // id: 103,
  },
};
