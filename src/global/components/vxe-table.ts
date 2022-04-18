import { App } from "vue";
import "vxe-table/lib/style.css";
import XEUtils from "xe-utils";
import zhCN from "vxe-table/es/locale/lang/zh-CN";

import { Column, Header, Table } from "vxe-table";
import { VXETable } from "vxe-table";

const components = [Header, Column, Table];

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});

export default function (app: App): void {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
