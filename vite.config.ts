import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages({
    exclude: ["**/components/*.vue"],
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "_v": resolve(__dirname, "src/views"),
      "_utils": resolve(__dirname, "src/utils"),
      "img": resolve(__dirname, "src/assets/images"),
    },
  },
});
