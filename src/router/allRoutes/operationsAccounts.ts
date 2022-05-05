const systemAccounts = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/systemAccounts/index.vue"
  );
export default {
  path: "/main/operations/systemAccounts",
  name: "operationsSystemAccounts",
  component: systemAccounts,
  children: [],
  meta: {
    title: "应付账款",
    // id: 103,
  },
};
