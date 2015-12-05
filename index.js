'use strict';

/**
 * download some version and platform chromedirver
 */
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var Download = require('download');
var unzip = require('unzip');

/**
 * download chromedriver
 *
 * @param  {Object} options
 *   @param {String} browser required, values: chrome, opera
 *   @param {String} platform: option, default `process.platform`, values: linux, darwin, win
 *   @param {String} directory: required, dirvers directory
 *   @param {String} version:  required, chromedirver version
 * @return {Promise}
 */

var getWebDrivers = {

  run: function(option) {

    this.option = option;
    this.download = new Download({mode: '777'});

    if (!fs.existsSync(option.directory)) {
      return Promise.reject(new Error('options.directory not exist, please create it.'));
    }

    return this._getWebDriver();
  },

  /**
   * download and unpacker one driver
   *
   * @param  {String} system
   * @return {Promise}
   */
  _getWebDriver: function() {

    var self = this;
    var obj = {
      'darwin': this.option.browser === 'chrome' ? 'mac32' : 'mac64',
      'win32': 'win32',
      'linux': 'linux32',
      'freebsd': 'linux32'
    };
    var system = obj[this.option.platform || process.platform];

    if (!system) {
      return Promise.reject('sorry, not support for ' + this.option.platform);
    }

    var baseUrl = 'http://npm.taobao.org/mirrors/' + this.option.browser
      + 'driver/' + this.option.version + '/' + this.option.browser + 'driver_' + system + '.zip';
    var directory = path.resolve(process.cwd(), this.option.directory);

    return new Promise(function(resolve, reject) {

      self.download
        .get(baseUrl)
        .dest(directory)
        .run(function(err, files) {

          if (err) {
            err.message += 'maybe the version is not exist';
            return reject(err);
          }

          var zipPath = files[0].path;

          fs.createReadStream(zipPath).pipe(unzip.Extract({
            path: self.option.directory
          }));

          return resolve(zipPath.replace(/\.zip$/, '/'));
        });
    });

  }
};

module.exports = getWebDrivers;

