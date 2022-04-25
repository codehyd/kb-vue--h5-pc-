import { Module } from "vuex";
import { IBildStore } from "./type";
import { IRootStore } from "@/store/type";

const loginModule: Module<IBildStore, IRootStore> = {
  namespaced: true,
  state: {
    billtypeid: "",
    currentInfo: {},
  },

  mutations: {
    changeBilltypeid(state, billtypeid: string | number) {
      state.billtypeid = billtypeid;
      //session缓存
      sessionStorage.setItem("billtypeid", billtypeid.toString());
    },
    changeCurrentInfo(state, currentInfo: any) {
      state.currentInfo = currentInfo;
    },
  },
  actions: {
    // 刷新页面的时候，获取sessionStorage中的billtypeid
    async getBilltypeid({ commit }) {
      const billtypeid = sessionStorage.getItem("billtypeid");
      if (billtypeid) {
        commit("changeBilltypeid", Number(billtypeid));
      }
    },
  },
};

export default loginModule;
