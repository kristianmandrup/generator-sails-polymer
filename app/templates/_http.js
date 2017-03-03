const express = require('express')<% if (!includeSwagger) { %>;<% } else { %>,
swagger = require('swagger-express');

// More modern Mw: see https://www.npmjs.com/package/swagger-ui-express
// const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
<% } %>

module.exports.http = {

  customMiddleware: function(app) {

    /*
     * Static files
     */
    app.use(express.static(process.cwd() + '/public'));<% if (includeSwagger) { %>


    // More modern Mw
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /*
     * Set up swagger
     */
    app.use(swagger.init(app, {
      apiVersion: '1.0',
      swaggerVersion: '1.0',
      swaggerURL: '/swagger',
      swaggerJSON: '/docs',
      swaggerUI: process.cwd() + '/public/swagger/',
      basePath: process.env.URL,
      info: {
        title: 'Swagger'
      },
      apis: [
        /*
         for example:
         process.cwd() + '/api/controllers/PersonController.js'
         */
      ],
      middleware: function () {}
    }));<% } %>

  }

};
