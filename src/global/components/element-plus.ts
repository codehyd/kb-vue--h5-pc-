import { App } from "vue";

import "element-plus/dist/index.css";

import {
  ElButton,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElSelect,
  ElStep,
  ElSteps,
} from "element-plus";

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElDivider,
  ElDialog,
  ElSteps,
  ElStep,
  ElRadio,
  ElOption,
  ElSelect,
];

export default function (app: App): void {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
