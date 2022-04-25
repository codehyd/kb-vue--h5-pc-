import { App } from "vue";
import "vxe-table/lib/style.css";
import VXETable from "vxe-table";

// vxe-table 饿了吗适配
import VXETablePluginElement from "vxe-table-plugin-element";
import "vxe-table-plugin-element/dist/style.css";

// import XEUtils from "xe-utils";
// import zhCN from "vxe-table/es/locale/lang/zh-CN";

// 功能插件
// import { Menu } from "vxe-table";

// const components = [Header, Column, Table, Icon, Footer];

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
// VXETable.setup({
//   i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
// });

export default function (app: App): void {
  // components.forEach((component) => {
  //   // console.log(component);
  //   app.component(component.name, component);
  // });
  VXETable.use(VXETablePluginElement);
  app.use(VXETable);
}
