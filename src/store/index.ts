import { createStore, Store, useStore as useVuexStroe } from "vuex";
import type { IRootStore, IStoreType } from "./type";

import login from "./login";

import { httpGetSelectOptions, httpGetCustormList } from "@/service/http/login";

import base64 from "@/utils/base64";
import local from "@/utils/local";

const store = createStore<IRootStore>({
  state: () => {
    return {
      authCode: "",
      custormList: [],
    };
  },
  mutations: {
    changeAuthCode(state, authCode: number | string) {
      state.authCode = authCode;
    },
    changeCustormList(state, custormList: any[]) {
      state.custormList = custormList;
    },
  },
  actions: {
    async getSelectOptions({ commit }) {
      const res = await httpGetSelectOptions();
      console.log(res);
    },
    // 获取自定义应用列表
    async getCustormList({ commit }, payload) {
      const res = await httpGetCustormList();
      if (res.content && res.code >= 1) {
        // 1. 如果custormList里有特定的key则赋值 若不是则重新set
        const custormList = base64.decodeToObj(res.content);
        console.log(local.getCache("token2.x"));

        // commit("changeCustormList", );
      }
    },
  },
  modules: {
    login,
  },
});

export function useStore(): Store<IStoreType> {
  return useVuexStroe();
}

export const refreshWindowSetup = () => {
  store.dispatch("login/localSetup");
};

export default store;
