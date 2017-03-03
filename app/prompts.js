const adapters = require('./adapters')

module.exports = (ctx) => {
  return [
    {
      name: 'appName',
      type: 'input',
      message: 'App name:',
      default: ctx.appname || 'my-sails-app'
    },
    {
      name: 'version',
      type: 'input',
      message: 'App version:',
      default: '0.0.1'
    },
    {
      name: 'includeSPA',
      type: 'confirm',
      message: 'Include Polymer SPA',
      default: ctx.options.spa
    },
    {
      name: 'waterlineORMs',
      type: 'checkbox',
      message: 'Select waterline ORMs',
      choices: adapters,
      default: ['disk', 'mongo']
    },
    {
      name: 'dbName',
      type: 'input',
      message: 'Main database name',
      default: 'my-db'
    },
    {
      name: 'includeSwagger',
      type: 'confirm',
      message: 'Include setup for Swagger documentation:',
      default: ctx.options.swagger
    }
  ];
}