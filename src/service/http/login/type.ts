import { IDataType } from "../../type";

export interface ICustormType extends IDataType {
  content: any;
}

export interface ICustormSetup {
  title: string;
  content?: any;
}
