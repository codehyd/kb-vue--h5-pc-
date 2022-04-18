import { Module } from "vuex";
import { ILoginStore } from "./type";
import { IRootStore } from "../type";

import local from "@/utils/local";
import base64 from "@/utils/base64";
import { getMenuByParent, addDynamicRoutes } from "@/utils/mapMenus";

import router from "@/router";

const loginModule: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state: {
    token: "",
    menus: [],
    classMenus: [],
  },

  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },

    changeMenus(state, menus: any) {
      state.menus = menus;
      state.classMenus = getMenuByParent(menus);

      // 动态注册路由
      const routes = addDynamicRoutes(menus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      // console.log(classMenus);
    },
  },
  actions: {
    // 点击登录
    async account({ commit, dispatch }, payload) {
      local.setCache("token2.x", base64.objToEncode(payload));
      commit("changeToken", payload);

      const menus = payload.functions[0].data;
      commit("changeMenus", menus);

      dispatch("getSelectOptions", null, { root: true });
      dispatch("getCustormList", null, { root: true });
      dispatch("setup/getCustormSetup", null, { root: true });

      router.push("/main");
    },

    localSetup({ commit, dispatch }) {
      const token = local.getCache("token2.x");
      if (token) {
        const payload = base64.decodeToObj(token);
        commit("changeToken", payload);

        const menus = payload.functions[0].data;
        commit("changeMenus", menus);

        dispatch("getSelectOptions", null, { root: true });
        dispatch("getCustormList", null, { root: true });
        dispatch("setup/getCustormSetup", null, { root: true });
      }
    },
  },
};

export default loginModule;
