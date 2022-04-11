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
const app = createApp(App);
app.use(globalComponent);
app.use(router);
app.mount("#app");
