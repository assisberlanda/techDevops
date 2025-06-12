import serverless from 'serverless-http';
import appPromise from '../../server/index.ts'; // Importa a promessa do nosso servidor com o caminho explícito

// Exporta o handler que o Netlify vai usar
export const handler = async (event: any, context: any) => {
  const app = await appPromise; // Espera a configuração do app ser concluída
  return serverless(app)(event, context);
};