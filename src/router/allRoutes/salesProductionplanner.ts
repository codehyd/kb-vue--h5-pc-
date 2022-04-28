const productionplanner = () =>
  import(
    /*webpackChunkName: "sales*/ "@/view/main/page/sales/productionplanner/index.vue"
  );
export default {
  path: "/main/sales/productionplanner",
  name: "salesProductionplanner",
  component: productionplanner,
  children: [],
  meta: {
    title: "生产计划",
    id: 4000,
  },
};
