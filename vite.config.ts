import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
          "#fff": "currentColor",
          "#ffffff": "currentColor",
          white: "currentColor",
          "#000": "currentColor",
          "#000000": "currentColor",
          black: "currentColor",
        },
      },
    }),
  ],
  server: {
    allowedHosts: [],
    host: "0.0.0.0",
    port: 5174,
  },
});
