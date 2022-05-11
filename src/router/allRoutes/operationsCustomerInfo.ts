const customerInfo = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/customerInfo/index.vue"
  );
export default {
  path: "/main/operations/customerInfo",
  name: "operationsCustomerInfo",
  component: customerInfo,
  children: [],
  meta: {
    title: "客户贡献",
    // id: 103,
  },
};
