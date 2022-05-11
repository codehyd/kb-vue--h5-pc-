const outstanding = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/outstanding/index.vue"
  );
export default {
  path: "/main/operations/outstanding",
  name: "operationsOutstanding",
  component: outstanding,
  children: [],
  meta: {
    title: "业绩排行",
    // id: 103,
  },
};
