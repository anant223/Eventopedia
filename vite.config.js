import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/v1": "http://localhost:4000",
    },
  },
});
