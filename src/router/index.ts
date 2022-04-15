import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import login from "@/view/login/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/main",
    component: () => import("@/view/main/index.vue"),
    children: [
      {
        path: "/main",
        redirect: "/main/home",
      },
      {
        path: "/main/home",
        component: () => import("@/view/main/page/home/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
