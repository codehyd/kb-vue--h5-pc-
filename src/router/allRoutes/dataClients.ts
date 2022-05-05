const clients = () =>
  import(/*webpackChunkName: "data*/ "@/view/main/page/data/clients/index.vue");
export default {
  path: "/main/data/clients",
  name: "dataClients",
  component: clients,
  children: [],
  meta: {
    title: "客户资料",
    // id: 103,
  },
};
