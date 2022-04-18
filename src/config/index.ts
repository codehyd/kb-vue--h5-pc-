// 软件系统
export const softOptions = [
  {
    value: "goSALE",
    label: "开博销售仓库管理系统",
  },
  {
    value: "goEASY",
    label: "开博送货管理系统",
  },
  {
    value: "KWISE",
    label: "开博供应链管理系统",
  },
];

// setup设置
import { setupOptions } from "./setup";
const mySetupOptions: any = {};
for (const setup of setupOptions) {
  mySetupOptions[setup.class] = setup;
}
export { mySetupOptions };
