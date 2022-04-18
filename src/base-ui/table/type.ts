export interface ITableConfigType {
  column?: any[];
  data?: any[];
  keyString: string;
  size?: "medium" | "small" | "mini";
  state?: "query";
  showFooter?: boolean;
  showIndex?: boolean;
}
