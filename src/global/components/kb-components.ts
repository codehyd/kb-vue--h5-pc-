// import { App } from "vue";

// import icon from "@/base-ui/icon";
// import WxScanLogin from "@/base-ui/wx-scan-login";
// import Dialog from "../../base-ui/dialog";

// const components: any[] = [icon, WxScanLogin, Dialog];

// export default function (app: App): void {
//   components.forEach((component) => {
//     // 获取component.__file的最后一个文件夹名称作为组件的名称 并且首字母大写
//     const componentName =
//       component.__file
//         .split("/")
//         .slice(-1)[0]
//         .split(".")[0]
//         .slice(0, 1)
//         .toUpperCase() +
//       component.__file.split("/").slice(-1)[0].split(".")[0].slice(1);
//     const name = component?.name ?? `Kb${componentName}`;
//     console.log(name);
//     app.component(name, component);
//   });
// }
