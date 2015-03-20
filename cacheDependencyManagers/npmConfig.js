'use strict';

var path = require('path');
var logger = require('../util/logger');
var shell = require('shelljs');
var fs = require('fs');

module.exports = {
  cliName: 'npm',
  configPath: path.resolve(process.cwd(), 'package.json'),
  installDirectory: 'node_modules',
  installCommand: 'npm install',
  installScope: function(configPath, scope) {
      var error = null;
      var packageFile = fs.readFileSync(configPath);
      var packageParsed = JSON.parse(packageFile);
      var dep = packageParsed[scope];

      for (var name in dep) {
        var version = dep[name];
        var fullCommand = this.installCommand + " " + name;
        if (version) {
           fullCommand = fullCommand  + "@" + "\"" + dep[name] + "\"";
        } 

        if (shell.exec(fullCommand).code !== 0) {
          error = 'error running ' + fullCommand;
          logger.logError(error);
        } else {
          logger.logInfo('installed ' + name + '@' + version);
        }
      }

      return error;
  }
};
