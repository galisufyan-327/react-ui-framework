import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        // module federation is being handled dynamically. see app.tsx
        // add dummy.js to prevent vite from throwing an error
        dummy: "dummy.js",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
      ],
    }),
  ],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  build: {
    target: "esnext",
  },
})
