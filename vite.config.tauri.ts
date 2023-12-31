import { defineConfig, mergeConfig } from 'vite'
import { tauri } from 'vite-plugin-tauri'

import baseViteConfig from './vite.config'

export default defineConfig(
  mergeConfig(
    baseViteConfig,
    defineConfig({
      plugins: [tauri()],

      // prevent vite from obscuring rust errors
      clearScreen: false,

      server: { strictPort: true, open: false },

      // env variables: to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
      // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
      envPrefix: ['VITE_', 'TAURI_'],

      build: {
        target: ['es2022', 'chrome100', 'safari13'],
        minify: !Boolean(process.env.TAURI_DEBUG) ? 'esbuild' : false,
        sourcemap: Boolean(process.env.TAURI_DEBUG)
      }
    })
  )
)
