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
        icon: true, // makes SVGs scale with font-size by default
        svgProps: {
          fill: "currentColor", // enables Tailwind text-* color classes
        },
        replaceAttrValues: {
          "#000": "currentColor",
          "#000000": "currentColor",
          black: "currentColor",
        },
      },
      include: "**/*.svg",
    }),
  ],
});
