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
    // Limite de aviso (padrão 500 kB)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Separa dependências de terceiros em chunks próprios (melhor cache)
        manualChunks: {
          react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
          mantine: [
            '@mantine/core',
            '@mantine/hooks',
            '@mantine/form',
            '@mantine/notifications',
          ],
          icons: ['react-bootstrap-icons'],
          vendor: ['axios', 'zod', 'mantine-form-zod-resolver'],
        },
      },
    },
  },

  base: process.env.NODE_ENV === 'production' ? '/utfpr/projetoReact/dist/' : '/',
});
