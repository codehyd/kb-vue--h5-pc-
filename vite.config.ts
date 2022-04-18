import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

import {
  createStyleImportPlugin,
  VxeTableResolve,
} from "vite-plugin-style-import";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue
    vue(),
    VueSetupExtend(),
    // 自动导入插件
    AutoImport({
      imports: ["vue", "vue-router", "vuex"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts",
    }),
    createStyleImportPlugin({
      resolves: [VxeTableResolve()],
    }),
  ],
  // 配置别名@
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // 解决打包后 @charset的问题
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },

  // 配置代理 (跨域)
  server: {
    proxy: {
      "^/api": {
        target: "https://kbapi.dianlan8.com:7804",
        rewrite: (path) => path.replace(/^\/api/, "/kbapi/rest"),
        changeOrigin: true,
      },
      // "^/wxapi": {
      //   target: "https://api.weixin.qq.com",
      //   rewrite: (path) => path.replace(/^\/wxapi/, ""),
      //   changeOrigin: true,
      // },
    },
  },
});
