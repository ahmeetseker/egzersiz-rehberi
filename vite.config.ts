import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/egzersiz-rehberi/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/404.html',
          dest: '.' // dist/ klasörünün köküne kopyalanır
        }
      ]
    })
  ]
})
