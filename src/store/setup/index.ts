import { Module } from "vuex";
import { ISetupState } from "./type";
import { IRootStore } from "../type";
import { mySetupOptions } from "@/config";
import { httpSetupState } from "@/service/http/login";
import base64 from "@/utils/base64";
import message from "@/utils/message";
import local from "@/utils/local";

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
      state.config[payload.class] = {
        setup: payload.config,
        label: mySetupOptions[payload.class].label,
        class: mySetupOptions[payload.class].class,
        icon: mySetupOptions[payload.class].icon,
        flag: mySetupOptions[payload.class].flag,
      };
    },
  },
  actions: {
    getCustormSetup({ commit }) {
      const id: string = base64.decodeToObj(local.getCache("token2.x")).uid;
      Object.keys(mySetupOptions).forEach((title) => {
        httpSetupState({ title: title + id }).then((res) => {
          const config = res?.data?.[0]?.data?.[0]?.fcontent;
          if (config) {
            const decodeConfig = base64.decodeToObj(config).setup;
            const defaultConfig = [...mySetupOptions[title].setup];

            const oraginSetup: any = [];
            // 将decodeConfig里每一项的value赋值给defaultConfig每一项的value 需要通过id去匹配对应的项
            Object.keys(defaultConfig).forEach((key) => {
              const item = defaultConfig?.find(
                (item: any) => item.id === decodeConfig[key]?.id
              );

              if (item) {
                item.value = decodeConfig[key].value;
                oraginSetup.push(item);
              } else {
                oraginSetup.push(defaultConfig[key]);
              }
            });

            commit("changeConfigToClass", {
              class: title,
              config: oraginSetup,
            });
          } else {
            commit("changeSetup", mySetupOptions);
          }
        });
      });
    },
    // 根据class去修改对应的配置
    async updateConfigToClass({ commit }, payload) {
      if (!payload.isSaveCloud) return commit("changeConfigToClass", payload);
      console.log(payload);
      const title = payload.class;
      // 查找mySetupOptions对应的title
      const currentSetupConfig = { ...mySetupOptions[title] };
      currentSetupConfig.setup = payload.config;
      const content = base64.objToEncode(currentSetupConfig);
      const id: string = base64.decodeToObj(local.getCache("token2.x")).uid;
      await httpSetupState({ title: title + id, content });
      message.success("保存成功");
      commit("changeConfigToClass", payload);
    },
  },
};

export default setupModule;
