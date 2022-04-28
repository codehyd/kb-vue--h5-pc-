const refund = () =>
  import(
    /*webpackChunkName: "procurement*/ "@/view/main/page/procurement/refund/index.vue"
  );
export default {
  path: "/main/procurement/refund",
  name: "procurementRefund",
  component: refund,
  children: [],
  meta: {
    title: "采购退货",
    id: 114,
  },
};
