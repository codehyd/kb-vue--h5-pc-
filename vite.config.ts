import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    // 自动导入插件
    AutoImport({
      imports: ["vue", "vue-router", "vuex"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts",
    }),
  ],
  // 配置别名@
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
