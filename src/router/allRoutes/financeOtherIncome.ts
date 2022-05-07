const otherIncome = () =>
  import(
    /*webpackChunkName: "finance*/ "@/view/main/page/finance/otherIncome/index.vue"
  );
export default {
  path: "/main/finance/otherIncome",
  name: "financeOtherIncome",
  component: otherIncome,
  children: [],
  meta: {
    title: "其他收入",
    // id: 103,
  },
};
