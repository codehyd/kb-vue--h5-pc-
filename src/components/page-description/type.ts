export interface IPageDesciptionType {
  label: string;
  icon?: string;
  field: string;
  custormKeys?: string[];
  col?: any;

  // 编辑模式下
  type?: "input" | "kehu" | "select" | "date";
  disabled?: boolean;
  otherCheckList?: any;
  required?: boolean;
  checkKey?: string;
}
