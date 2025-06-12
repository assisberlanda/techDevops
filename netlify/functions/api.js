// netlify/functions/api.js
const serverless = require('serverless-http');
const appPromise = require('../../dist/index.js').default; // Aponta para a API compilada

exports.handler = async (event, context) => {
  const app = await appPromise;
  return serverless(app)(event, context);
};