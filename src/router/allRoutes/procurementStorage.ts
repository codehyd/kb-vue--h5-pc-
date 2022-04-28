const storage = () =>
  import(
    /*webpackChunkName: "procurement*/ "@/view/main/page/procurement/storage/index.vue"
  );
export default {
  path: "/main/procurement/storage",
  name: "procurementStorage",
  component: storage,
  children: [],
  meta: {
    title: "采购入库",
    id: 112,
  },
};
