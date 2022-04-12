import { Module } from "vuex";
import { ILoginStore } from "./type";
import { IRootStore } from "../type";

import local from "@/utils/local";
import base64 from "@/utils/base64";

const loginModule: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state: {
    token: "",
  },

  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
  },
  actions: {
    // 点击登录
    async account({ commit, dispatch }, payload) {
      local.setCache("token2.x", base64.objToEncode(payload));
      commit("changeToken", payload);
      dispatch("getSelectOptions", null, { root: true });
      dispatch("getCustormList", null, { root: true });
    },

    localSetup({ commit, dispatch }) {
      const token = local.getCache("token2.x");
      if (token) {
        commit("changeToken", base64.decodeToObj(token));
        dispatch("getSelectOptions", null, { root: true });
        dispatch("getCustormList", null, { root: true });
      }
    },
  },
};

export default loginModule;
