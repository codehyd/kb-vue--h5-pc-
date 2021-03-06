export interface IFormItemsType {
  field: string;
  label: string;
  readonly?: boolean;
  rules?: any;
  // # formitem类型
  type:
    | "input"
    | "password"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "switch"
    | "date"
    | "time"
    | "datetime"
    | "button"
    | "number";

  // # 多选框列表
  otherCheckList?: any[];
  checkKey?: string;
  // # 按钮的文字
  otherButtonText?: string;
  // # 日期类型
  otherDateType?:
    | "year"
    | "month"
    | "date"
    | "dates"
    | "datetime"
    | "week"
    | "datetimerange"
    | "daterange"
    | "monthrange";
}

export interface IFormType {
  formItems: IFormItemsType[];
  labelWidth?: string;
  inline?: boolean;
  colLayout?: object;
  gutter?: number;
  labelPosition?: "left" | "right" | "top";
}
