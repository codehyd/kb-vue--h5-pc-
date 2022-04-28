const quote = () =>
  import(/*webpackChunkName: "sales*/ "@/view/main/page/sales/quote/index.vue");
export default {
  path: "/main/sales/quote",
  name: "salesQuote",
  component: quote,
  children: [],
  meta: {
    title: "销售报价",
    id: 101,
  },
};
