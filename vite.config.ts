import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const customElements = ['swiper-container', 'swiper-slide'] as any;
export default defineConfig({
  plugins: [vue({
    template:{
      compilerOptions:{
        isCustomElement: (tag)=> customElements.includes(tag)
      }
    }
  })],
  assetsInclude: ['**/*.glb']
})
