/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  // const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "@/base-ui/icon";
declare module "@/base-ui/wx-scan-login";
declare module "@/base-ui/echarts";

declare module "qs";
