import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { host: "127.0.0.1", port: 3000, strictPort: true },
  // The published XP.css and 98.css contain legacy selectors Lightning CSS rejects.
  // They are already minified; retain them while still processing their bundled fonts.
  build: { outDir: "build", cssMinify: false },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
