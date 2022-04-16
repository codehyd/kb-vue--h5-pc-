import { Module } from "vuex";
import { IHomeStore } from "./type";
import { IRootStore } from "../type";

import {
  httpGetBilltypeList,
  httpGetSalesData,
  httpGetTodoListData,
  httpGetKanbanData,
  httpGetNoticeList,
} from "@/service/http/home";

import { firstDay, lastDay } from "@/utils/timer";

const loginModule: Module<IHomeStore, IRootStore> = {
  namespaced: true,
  state: {
    billList: [],
    salesData: {},
    todoList: [],
    kanbanData: [],
    noticeList: [],
  },

  mutations: {
    changeBillList(state, billList: any) {
      state.billList = billList;
    },
    changeSalesData(state, salesData: any) {
      state.salesData = salesData;
    },
    changeTodoList(state, todoList: any) {
      state.todoList = todoList;
    },
    changeKanbanData(state, kanbanData: any) {
      state.kanbanData = kanbanData;
    },
    changeNoticeList(state, noticeList: any) {
      state.noticeList = noticeList;
    },
  },
  actions: {
    // 获取用户的账单类型列表
    async getUserBillList({ commit }, payload) {
      const res = await httpGetBilltypeList({ flag: payload });
      commit("changeBillList", res?.data?.[0]?.data ?? []);
    },
    // 获取销售数据
    async getSalesData({ commit }, payload) {
      const res = await httpGetSalesData({ flag: payload });
      commit("changeSalesData", res);
    },
    // 获取用户的待办事项
    async getTodoList({ commit }, payload) {
      const res = await httpGetTodoListData({ flag: payload });
      commit("changeTodoList", res?.data?.[0]?.data ?? []);
    },
    // 获取看板数据
    async getKanbanData({ commit }, payload) {
      const requestData = {
        begdate: payload?.begdate ?? firstDay(),
        enddate: payload?.enddate ?? lastDay(),
      };
      const res = await httpGetKanbanData(requestData);
      commit("changeKanbanData", res);
    },
    // 公告
    async getNoticeList({ commit }) {
      const res = await httpGetNoticeList();
      commit("changeNoticeList", res?.data?.[0]?.data ?? []);
    },
  },
};

export default loginModule;
