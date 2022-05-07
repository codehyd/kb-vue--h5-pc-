const salestatement = () =>
  import(
    /*webpackChunkName: "sales*/ "@/view/main/page/sales/salestatement/index.vue"
  );
export default {
  path: "/main/sales/salestatement",
  name: "salesSalestatement",
  component: salestatement,
  children: [],
  meta: {
    title: "销售对账",
    // id: 105,
  },
};
