import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  // ---> ADICIONADO: Informa ao Vite o caminho base para o deploy
  base: "/techDevops/",

  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // ---> MANTIDO: Esta linha está correta para sua estrutura
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // ---> CORRIGIDO: A pasta de saída agora é 'dist' na raiz do projeto
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});