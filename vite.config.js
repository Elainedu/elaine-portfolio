// vite.config.js — Vite 建置設定，啟用 Vue 外掛，執行 npm run build 時使用
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
