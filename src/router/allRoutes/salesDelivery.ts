const delivery = () =>
  import(
    /*webpackChunkName: "sales*/ "@/view/main/page/sales/delivery/index.vue"
  );
export default {
  path: "/main/sales/delivery",
  name: "salesDelivery",
  component: delivery,
  children: [],
  meta: {
    title: "้ๅฎ้่ดง",
    id: 103,
  },
};
