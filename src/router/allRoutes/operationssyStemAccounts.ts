const accounts = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/accounts/index.vue"
  );
export default {
  path: "/main/operations/accounts",
  name: "operationsaccounts",
  component: accounts,
  children: [],
  meta: {
    title: "应收账款",
    // id: 103,
  },
};
