// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Caching Proxy Server API',
      version: '1.0.0',
      description: 'Documentation for Caching Proxy Server with LRU and Invalidation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // We have to change this URL based on the environment
      },
    ],
  },
  apis: ['./routes/*.js'], // path where your routes are defined
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
