import { App } from "vue";
import * as ElIcons from "@element-plus/icons-vue";

export default function (app: App) {
  for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name]);
  }
}
