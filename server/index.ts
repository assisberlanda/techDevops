import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Cria a instância do Express
const app = express();

async function configureApp() {
  // Configura os middlewares do Express
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Middleware de log personalizado
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  // Registra as rotas da API
  await registerRoutes(app);

  // Middleware de tratamento de erros
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
  
  // No ambiente de produção (Netlify), servimos os arquivos estáticos do frontend
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }

  return app;
}

// **A PARTE MAIS IMPORTANTE**
// Em vez de iniciar o servidor, nós exportamos a promessa de configuração do app.
// Isso permite que o `serverless-http` use nossa aplicação Express configurada.
export default configureApp();