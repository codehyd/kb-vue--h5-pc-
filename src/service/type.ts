import type { MessageType } from "@/utils/message";

export interface IDataType<T = any> {
  code: number;
  data: T;
  msg: string;
  type: MessageType;
}
