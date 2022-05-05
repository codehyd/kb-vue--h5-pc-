const customer = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/customer/index.vue"
  );
export default {
  path: "/main/operations/customer",
  name: "operationsCustomer",
  component: customer,
  children: [],
  meta: {
    title: "客户贡献",
    // id: 103,
  },
};
