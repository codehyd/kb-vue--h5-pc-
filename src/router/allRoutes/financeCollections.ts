const collections = () =>
  import(
    /*webpackChunkName: "finance*/ "@/view/main/page/finance/collections/index.vue"
  );
export default {
  path: "/main/finance/collections",
  name: "financeCollections",
  component: collections,
  children: [],
  meta: {
    title: "销售收款",
    // id: 103,
  },
};
