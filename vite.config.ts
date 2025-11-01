import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "ChartjsAdapterDayjs",
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: (id) => id === "chart.js" || id.startsWith("dayjs"),
      output: {
        exports: "named",
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
