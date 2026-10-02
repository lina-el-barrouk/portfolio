import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development, /api requests are proxied to the admin API server (npm run server).
// For production, either run the API server behind the same domain or set VITE_API_URL.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
