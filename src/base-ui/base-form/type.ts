type IFormType =
  | "input"
  | "password"
  | "select"
  | "daterange"
  | "date"
  | "kehu"
  | "textarea"
  | "number";

interface IInputOptionsType {
  search: boolean;
  appendText?: string;
}

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // 针对特殊的属性
  otherOptions?: any;
  isHidden?: boolean;
  readonly?: boolean;
  // defaultValue?: any;
  defaultDateValue?: any[];
  col?: any;
  inputOptions?: IInputOptionsType;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
  // 行内模式
  inline?: boolean;
  isHideErrorMargin?: boolean;
}
