import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import login from "@/view/login/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
