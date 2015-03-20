'use strict';

var path = require('path');
var logger = require('../util/logger');

module.exports = {
  cliName: 'composer',
  configPath: path.resolve(process.cwd(), 'composer.json'),
  installDirectory: 'vendor',
  installCommand: 'composer install',
  installScope: function(configPath, scope) {
    //no-op
  }
};
