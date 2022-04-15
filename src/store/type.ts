export interface IRootStore {
  authCode: string | number;
  custormList: any;
  selectOptions: any;
}
import { ILoginStore } from "./login/type";
import { IHomeStore } from "./home/type";

// 模块
export interface IRootWithModule {
  login: ILoginStore;
  home: IHomeStore;
}

export type IStoreType = IRootStore & IRootWithModule;
