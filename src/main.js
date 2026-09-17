// src/main.js — 應用程式入口：建立 Vue 實例、掛載全域 v-reveal 捲動動畫指令、渲染根元件 App.vue
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import reveal from "./directives/reveal.js";

const app = createApp(App);
app.directive("reveal", reveal);   // 全域 v-reveal 捲動進場指令
app.mount("#app");
