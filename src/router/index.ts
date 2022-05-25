import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { ElLoading } from "element-plus";

import login from "@/view/login/index.vue";
import local from "@/utils/local";
import message from "@/utils/message";

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
        name: "home",
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/setup",
    component: () => import("@/view/setup/index.vue"),
    meta: {
      title: "设置",
    },
  },

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

// 监听路由守卫
let routerLoading: any;
const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to: any) => {
  if (to.path !== "/login") {
    const token = local.getCache("token2.x");
    if (!token) {
      message.show("登录信息生效 请重新登录");
      return "/login";
    }
  }
  document.title = to.meta.title || "";
  routerLoading = ElLoading.service({
    text: "路由加载中",
    background: "rgba(0, 0, 0, 0.5)",
  });

  // console.log(to);
});
router.afterEach(() => {
  routerLoading.close();
});

export default router;
