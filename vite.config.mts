import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'


export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName:()=> 'index.js'
    },
  },
  plugins: [dts({ tsconfigPath: './tsconfig-build.json' })]
})
