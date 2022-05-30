import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex']
    }),
    styleImport({
      resolves: [ VantResolve() ],
    }),
  ],
  resolve: {
		alias: [{find: '@', replacement: resolve(__dirname, 'src')}]
	}
})
