import { App } from "vue";

import "element-plus/dist/index.css";

import { ElButton, ElDivider, ElForm, ElFormItem, ElInput } from "element-plus";

const components = [ElButton, ElForm, ElFormItem, ElInput, ElDivider];

export default function (app: App): void {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
