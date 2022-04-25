import { createStore, Store, useStore as useVuexStroe } from "vuex";
import type { IRootStore, IStoreType } from "./type";

import login from "./login";
import home from "./home";
import bild from "./home/bild";
import setup from "./setup";

import {
  httpGetSelectOptions,
  httpGetCustormList,
  httpSetCustormList,
} from "@/service/http/login";

import base64 from "@/utils/base64";
import local from "@/utils/local";
import { getMenu } from "@/utils/mapMenus";
import message from "@/utils/message";

const store = createStore<IRootStore>({
  state: () => {
    return {
      authCode: "",
      custormList: [],
      selectOptions: {},
    };
  },
  mutations: {
    changeSelectOptions(state, payload: any) {
      state.selectOptions = payload;
    },
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
      commit("changeSelectOptions", res);
    },
    // 获取自定义应用列表(第一次登录)
    async getCustormList({ commit }, payload) {
      const res = await httpGetCustormList();
      const token = base64.decodeToObj(local.getCache("token2.x"));
      const menus = token.functions[0].data;
      if (res.content && res.code >= 1) {
        // 1. 如果custormList里有特定的key则赋值 若不是则重新set
        const custormList = base64.decodeToObj(res.content);
        if (custormList.some((item: any) => "parent" in item)) {
          commit("changeCustormList", custormList);
        } else {
          commit("changeCustormList", getMenu(custormList, 8));
        }
      } else {
        commit("changeCustormList", getMenu(menus, 8));
      }
    },

    // 设置自定义列表
    setCustormList({ commit }, payload) {
      // 这里将自定义列表转换成base64字符串
      const content = base64.objToEncode(payload);
      httpSetCustormList(content).then((res) => {
        if (res.code >= 1) {
          message.show("设置成功", "success");
        }
        commit("changeCustormList", payload);
      });
    },
  },
  modules: {
    login,
    home,
    bild,
    setup,
  },
});

export function useStore(): Store<IStoreType> {
  return useVuexStroe();
}

export const refreshWindowSetup = () => {
  store.dispatch("login/localSetup");
  store.dispatch("bild/getBilltypeid");
};

export default store;
