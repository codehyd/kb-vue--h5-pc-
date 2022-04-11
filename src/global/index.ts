import { App } from "vue";

import globalRegElementPlus from "./components/element-plus";
import globalRegCustormComponents from "./components/kb-components";

export default function (app: App): void {
  app.use(globalRegElementPlus);
  app.use(globalRegCustormComponents);
}
