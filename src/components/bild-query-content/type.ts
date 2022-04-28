import { IForm } from "@/base-ui/base-form";
import { VxeTablePropTypes } from "vxe-table";
import { IPageDesciptionType } from "../page-description";
import {
  IBildStatusType,
  ITableActiveConfigType,
  IBildActiveType,
} from "../page-table";

export interface IBildQueryForm {
  // 检索form
  searchFormConfig: IForm;
  isShowQuery?: boolean;
}

export interface IBildQueryTable {
  menuConfig?: VxeTablePropTypes.MenuConfig;
  tableActiveConfig?: ITableActiveConfigType[];
}

export interface IBildQueryDetailTable {
  clientConfig: IPageDesciptionType[];
  status?: IBildStatusType[];
  active?: IBildActiveType[];
}
