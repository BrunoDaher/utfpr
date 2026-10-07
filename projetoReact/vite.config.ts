import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Se quiser depurar estilos do Mantine originais também
  css: {
    devSourcemap: true,
  },


  // Ajuste correto: sourcemap fica apenas dentro de build
  build: {
    sourcemap: true,
  },

  base: process.env.NODE_ENV === 'production' ? '/utfpr/projetoReact/dist/' : '/',
});
