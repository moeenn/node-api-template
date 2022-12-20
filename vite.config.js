import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  test: {
    watch: false,
    exclude: ["node_modules", "build", "database", "prisma"]
  },  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
