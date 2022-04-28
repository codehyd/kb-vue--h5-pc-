const order = () =>
  import(
    /*webpackChunkName: "procurement*/ "@/view/main/page/procurement/order/index.vue"
  );
export default {
  path: "/main/procurement/order",
  name: "procurementOrder",
  component: order,
  children: [],
  meta: {
    title: "采购订单",
    id: 111,
  },
};
