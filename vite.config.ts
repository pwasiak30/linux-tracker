import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  // viteSingleFile inlinuje CAŁY JS i CSS bezpośrednio do index.html podczas
  // `npm run build`. Dzięki temu dist/index.html można otworzyć zwykłym
  // dwuklikiem (file://) bez serwera — przeglądarki blokują ładowanie
  // zewnętrznych plików <script type="module"> spod file://, ale inline'owany
  // skrypt bez zewnętrznych zależności działa bez problemu.
  plugins: [react(), viteSingleFile()],
  base: './',
  server: {
    port: 5173,
    host: true,
  },
})
