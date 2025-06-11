import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Removemos os plugins específicos do Replit que não são necessários para o deploy
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  // ---> REMOVIDO: 'base: "/techDevops/"'. O Netlify não precisa disso.

  plugins: [
    react(),
    // Os plugins do Replit foram removidos. Se você ainda desenvolve no Replit,
    // eles não atrapalham o build do Netlify, mas para um deploy limpo,
    // é melhor removê-los do build de produção. Se preferir, pode mantê-los.
  ],

  // ---> MANTIDO: Seus aliases são importantes para os imports do projeto.
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },

  // ---> MANTIDO: 'root' aponta para sua pasta 'client', o que está correto.
  root: 'client',
  
  // ---> MANTIDO: A configuração de build já está correta para o Netlify.
  build: {
    // A pasta de saída será 'dist' na raiz do projeto.
    outDir: path.resolve(process.cwd(), 'dist'),
    emptyOutDir: true,
  },
});