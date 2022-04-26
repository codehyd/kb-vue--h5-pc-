export interface IPageDesciptionType {
  label: string;
  icon?: string;
  field: string;
  custormKeys?: string[];

  // 编辑模式下
  type?: "input" | "kehu" | "select" | "date";
  disabled?: boolean;
  otherCheckList?: any;
  required?: boolean;
  checkKey?: string;
}
