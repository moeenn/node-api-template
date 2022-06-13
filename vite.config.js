import { defineConfig } from "vite"

export default defineConfig({
  test: {
    watch: false,
		exclude: ["node_modules", "database_storage"]
  }
})
