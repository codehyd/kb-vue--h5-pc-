const inquire = () =>
  import(
    /*webpackChunkName: "store*/ "@/view/main/page/store/inquire/index.vue"
  );
export default {
  path: "/main/store/inquire",
  name: "storeInquire",
  component: inquire,
  children: [],
  meta: {
    // title: "存货查询",
    title: "库存查询",
    // id: 2
  },
};
