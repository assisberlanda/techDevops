import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuração de build EXCLUSIVA para o GitHub Pages
export default defineConfig({
  plugins: [
    react(),
  ],
  // Define o caminho base para o subdiretório do GitHub Pages
  base: "/techDevops/",

  // Aponta para a raiz do código do frontend
  root: path.resolve(import.meta.dirname, "client"),

  // **ADIÇÃO CRUCIAL: Força o Vite a usar a pasta `public` dentro de `client`**
  publicDir: path.resolve(import.meta.dirname, "client", "public"),

  resolve: {
    // Mantém os mesmos aliases para que os imports funcionem
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  // Configuração da saída do build
  build: {
    // O diretório de saída será 'dist' na raiz do projeto
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});