import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue() ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // "socket.io-client": "socket.io-client/dist/socket.io.js",
    }
  },
  optimizeDeps: {
    include: [ "../lib/avatar_param_control.js" ],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html")
      }
    },
    commonjsOptions: {
      include: [ "../lib/avatar_param_control.js" ],
      defaultIsModuleExports: true,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
      },
      "/socket.io": {
        target: "http://localhost:8080/",
        ws: true,
        changeOrigin: true,
      }
    }
  }
})
