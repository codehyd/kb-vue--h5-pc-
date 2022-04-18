import { App } from "vue";

import "element-plus/dist/index.css";

import {
  ElAside,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckTag,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElStep,
  ElSteps,
  ElSubMenu,
  ElSwitch,
  ElTabPane,
  ElTabs,
  ElTag,
  ElTimePicker,
  ElTooltip,
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
  ElHeader,
  ElContainer,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCard,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElRow,
  ElCol,
  ElEmpty,
  ElTag,
  ElCheckTag,
  ElTooltip,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElTimePicker,
  ElSwitch,
  ElRadioGroup,
  ElAvatar,
  ElPopover,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDrawer,
  ElTabs,
  ElTabPane,
];

export default function (app: App): void {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
