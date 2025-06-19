import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.jsx"),
      name: "RewardSdk",
      formats: ["es", "cjs", "umd"],
      // Output file names for each format
      fileName: (format) => {
        switch (format) {
          case "es":
            return "esm/reward-sdk.js";
          case "cjs":
            return "cjs/reward-sdk.js";
          case "umd":
          default:
            return "umd/reward-sdk.js";
        }
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Ensure UMD build is properly exposed on window
        banner: (format) => {
          if (format === "umd") {
            return `/* 
              Reward SDK v1.0.0
              https://github.com/Amgad012/reward-sdk
              Released under the MIT License.
            */`;
          }
          return "";
        },
      },
    },
    minify: true,
    sourcemap: false,
  },
});
