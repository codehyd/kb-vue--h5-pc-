const order = () =>
  import(/*webpackChunkName: "sales*/ "@/view/main/page/sales/order/index.vue");
export default {
  path: "/main/sales/order",
  name: "salesOrder",
  component: order,
  children: [],
  meta: {
    title: "销售订单",
    id: 102,
  },
};
