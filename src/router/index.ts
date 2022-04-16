import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import login from "@/view/login/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },
  {
    path: "/main",
    name: "main",
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
  { path: "/setup", component: () => import("@/view/setup/index.vue") },

  // not found  (404)
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(
        /* webpackChunkName: "notFound-chunk" */ "../view/notfount/not-fount.vue"
      ),
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
