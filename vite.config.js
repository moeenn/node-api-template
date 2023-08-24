import { defineConfig } from "vite"
import path from "node:path"

export default defineConfig({
  test: {
    watch: false,
    exclude: ["node_modules", "build", "docker-volume"]
  },  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
