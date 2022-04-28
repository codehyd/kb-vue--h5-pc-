const exits = () =>
  import(/*webpackChunkName: "store*/ "@/view/main/page/store/exits/index.vue");
export default {
  path: "/main/store/exits",
  name: "storeExits",
  component: exits,
  children: [],
  meta: {
    title: "商品出仓",
    id: 2,
  },
};
