import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [devtools({
    autoname: true,
    /* locator: {
      targetIDE: 'vscode',
      key: 'Ctrl',
      jsxLocation: true,
      componentLocation: true,
    }, */
  }),solidPlugin()],
})
