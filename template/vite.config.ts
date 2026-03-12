import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { wrapperEnv } from './build/utils'
import { visualizer } from 'rollup-plugin-visualizer'
import topLevelAwait from 'vite-plugin-top-level-await'
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig((config): any => {
  const env: any = wrapperEnv(loadEnv(config.mode, process.cwd()))

  const plugins = [
    vue(),
    vueDevTools(),
    removeConsole(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ]

  if (process.env.ANALYZE) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
      }),
    )
  }

  return {
    base: env.VITE_BASE_PATH,
    plugins,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (
                (id.includes('vue') ||
                  id.includes('@vue') ||
                  id.includes('pinia') ||
                  id.includes('vuex')) &&
                !id.includes('@vueuse') &&
                !id.includes('-vue')
              ) {
                return 'vue-core'
              }
              if (id.includes('echarts') || id.includes('chart.js')) {
                return 'charts'
              }
              return 'vendor'
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})
