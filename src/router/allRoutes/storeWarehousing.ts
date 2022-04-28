const warehousing = () =>
  import(
    /*webpackChunkName: "store*/ "@/view/main/page/store/warehousing/index.vue"
  );
export default {
  path: "/main/store/warehousing",
  name: "storeWarehousing",
  component: warehousing,
  children: [],
  meta: {
    title: "商品入仓",
    id: 1,
  },
};
