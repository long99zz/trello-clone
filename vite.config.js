import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react(),
    vitePluginSvgr()
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
