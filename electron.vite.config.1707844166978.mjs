// electron.vite.config.mjs
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      cors: true,
      watch: {
        usePolling: true,
        interval: 1e3
      }
    }
  }
});
export {
  electron_vite_config_default as default
};
