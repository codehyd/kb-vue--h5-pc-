import { App } from "vue";

import globalRegElementPlus from "./components/element-plus";
import globalRegElementPlusIcon from "./components/element-plus-icon";
import globalRegVxeTable from "./components/vxe-table";

import globalRegDirectives from "./direccctive";

export default function (app: App): void {
  app.use(globalRegElementPlus);
  app.use(globalRegElementPlusIcon);
  app.use(globalRegDirectives);
  app.use(globalRegVxeTable);
  // app.use(globalRegCustormComponents);
}
