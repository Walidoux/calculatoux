import { defineConfig, mergeConfig } from 'vite'
import { tauri } from 'vite-plugin-tauri'

import baseViteConfig from './vite.config'

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(
    baseViteConfig,
    defineConfig({
      plugins: [tauri()],
      // prevent vite from obscuring rust errors

      clearScreen: false,
      // Tauri expects a fixed port, fail if that port is not available

      server: {
        strictPort: true,
        open: false
      },

      // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
      // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
      // env variables
      envPrefix: ['VITE_', 'TAURI_'],
      build: {
        // Tauri supports es2021
        target: ['es2022', 'chrome100', 'safari13'],
        // don't minify for debug builds
        minify: !Boolean(process.env.TAURI_DEBUG) ? 'esbuild' : false,
        // produce sourcemaps for debug builds
        sourcemap: Boolean(process.env.TAURI_DEBUG)
      }
    })
  )
)