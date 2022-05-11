const kanban = () =>
  import(
    /*webpackChunkName: "operations*/ "@/view/main/page/operations/kanban/index.vue"
  );
export default {
  path: "/main/operations/kanban",
  name: "operationsKanban",
  component: kanban,
  children: [],
  meta: {
    title: "经营看板",
    // id: 103,
  },
};
