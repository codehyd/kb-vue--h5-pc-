import { App } from "vue";
import VueDragResize from "vue-drag-resize";

export default function (app: App): void {
  app.component("vue-drag-resize", VueDragResize);
}
