import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

fs.rmSync("dist", { recursive: true, force: true });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main.js",
      },
    }),
  ],
});
