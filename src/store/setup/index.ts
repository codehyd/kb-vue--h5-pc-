import { Module } from "vuex";
import { ISetupState } from "./type";
import { IRootStore } from "../type";
import { mySetupOptions } from "@/config";
import { httpSetupState } from "@/service/http/login";
import base64 from "@/utils/base64";

const setupModule: Module<ISetupState, IRootStore> = {
  namespaced: true,
  state: {
    config: {},
  },

  mutations: {
    changeSetup(state, payload) {
      state.config = payload;
    },
    changeConfigToClass(state, payload) {
      state.config[payload.class].setup = payload.config;
    },
  },
  actions: {
    getCustormSetup({ commit }) {
      Object.keys(mySetupOptions).forEach((title) => {
        httpSetupState({ title }).then((res) => {
          const config = res?.data?.[0]?.data?.[0]?.fcontent;
          if (config) {
            const decodeConfig = base64.decodeToObj(config).setup;
            const defaultConfig = mySetupOptions[title].setup;

            console.log(decodeConfig, defaultConfig);
          } else {
            commit("changeSetup", mySetupOptions);
          }
        });
      });
    },
    // 根据class去修改对应的配置
    updateConfigToClass({ commit }, payload) {
      if (!payload.isSaveCloud) return commit("changeConfigToClass", payload);
    },
  },
};

export default setupModule;
