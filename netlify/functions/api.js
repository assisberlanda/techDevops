const serverless = require('serverless-http');
const appPromise = require('../../dist/api.js').default;

exports.handler = async (event, context) => {
  const app = await appPromise;
  return serverless(app)(event, context);
};