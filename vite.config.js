import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  test: {
    watch: false,
    exclude: [".git", "node_modules", "build", ".husky", "mongodb"]
  },  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
