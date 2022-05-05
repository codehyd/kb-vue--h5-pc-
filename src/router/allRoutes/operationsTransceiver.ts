const transceiver = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/transceiver/index.vue"
  );
export default {
  path: "/main/operations/transceiver",
  name: "operationsTransceiver",
  component: transceiver,
  children: [],
  meta: {
    title: "收发存",
    // id: 103,
  },
};
