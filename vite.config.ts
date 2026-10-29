import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [react()]

  // Keep the development inspector out of production builds.
  if (command === 'serve') {
    const inspectorPackage = 'kimi-plugin-inspect-react'
    const { inspectAttr } = await import(inspectorPackage)
    plugins.unshift(inspectAttr())
  }

  return {
    base: '/',
    plugins,
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
