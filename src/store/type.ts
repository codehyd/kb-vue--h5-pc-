export interface IRootStore {
  authCode: string | number;
  custormList: any;
  selectOptions: any;
}
import { ILoginStore } from "./login/type";
import { IHomeStore } from "./home/type";
import { ISetupState } from "./setup/type";

// 模块
export interface IRootWithModule {
  login: ILoginStore;
  home: IHomeStore;
  setup: ISetupState;
}

export type IStoreType = IRootStore & IRootWithModule;
