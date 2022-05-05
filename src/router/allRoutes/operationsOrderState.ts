const orderState = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/orderState/index.vue"
  );
export default {
  path: "/main/operations/orderState",
  name: "operationsOrderState",
  component: orderState,
  children: [],
  meta: {
    title: "订单跟踪",
    // id: 103,
  },
};
