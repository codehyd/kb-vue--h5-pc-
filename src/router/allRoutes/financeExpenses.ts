const expenses = () =>
  import(
    /*webpackChunkName: "finance*/ "@/view/main/page/finance/expenses/index.vue"
  );
export default {
  path: "/main/finance/expenses",
  name: "financeExpenses",
  component: expenses,
  children: [],
  meta: {
    title: "费用支出",
    // id: 103,
  },
};
