import { createApp } from "vue";

import App from "./App.vue";

// 初始化样式
import "normalize.css";
import "./assets/css/index.less";

// 字体图标
import "./assets/font/iconfont.css";

// 引入组件
import globalComponent from "./global";

// 路由
import router from "./router";

// 状态管理
import store, { refreshWindowSetup } from "./store";

const app = createApp(App);
app.use(store);
app.use(globalComponent);
refreshWindowSetup();
app.use(router);
app.mount("#app");
