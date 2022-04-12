export interface IRootStore {
  authCode: string | number;
  custormList: any;
}
import { ILoginStore } from "./login/type";

// 模块
export interface IRootWithModule {
  login: ILoginStore;
}

export type IStoreType = IRootStore & IRootWithModule;
