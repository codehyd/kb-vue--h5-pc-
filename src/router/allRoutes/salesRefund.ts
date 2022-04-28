const refund = () =>
  import(
    /*webpackChunkName: "sales*/ "@/view/main/page/sales/refund/index.vue"
  );
export default {
  path: "/main/sales/refund",
  name: "salesRefund",
  component: refund,
  children: [],
  meta: {
    title: "销售退货",
    id: 105,
  },
};
