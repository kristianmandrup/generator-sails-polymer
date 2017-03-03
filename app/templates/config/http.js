var express = require('express');

module.exports.http = {

  middleware: {

    // passportInit    : require('passport').initialize(),
    // passportSession : require('passport').session(),

    bowerAssets : express.static('bower_components'),
    // bootstrapAssets : express.static('node_modules/bootstrap/dist'),


    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'bowerAssets',
      // 'bootstrapAssets',
      // 'passportInit',
      // 'passportSession',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
  }
}