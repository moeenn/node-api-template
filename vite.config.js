import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  test: {
    watch: false,
    exclude: ["node_modules", "database_storage", "build"]
  },  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
