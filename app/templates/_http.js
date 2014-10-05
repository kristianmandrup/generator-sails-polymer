var express = require('express'),
  swagger = require('swagger-express');

module.exports.http = {

  customMiddleware: function(app) {

    /*
     * Static files
     */
    app.use(express.static(process.cwd() + '/public'));<% if (includeSwagger) { %>

    /*
     * Set up swagger
     */
    app.use(swagger.init(app, {
      apiVersion: '1.0',
      swaggerVersion: '1.0',
      swaggerURL: '/swagger',
      swaggerJSON: '/docs',
      swaggerUI: process.cwd() + '/public/swagger/',
      basePath: 'http://localhost:1337',
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
