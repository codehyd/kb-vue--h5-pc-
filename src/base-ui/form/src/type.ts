export interface IFormItemsType {
  field: string;
  label: string;
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
    | "datetime";
  otherCheckList?: any[];
  rules?: any;
}

export interface IFormType {
  formItems: IFormItemsType[];
  labelWidth?: string;
  inline?: boolean;
  colLayout?: object;
  gutter?: number;
  labelPosition?: "left" | "right" | "top";
}
