var rimraf = require('rimraf');
var fs = require('fs');
var should = require('should');

var getWebDriver = require('../');

var driverDir = './drivers';

describe('index.js', function() {

  this.timeout(10 * 1000);

  before(function(done) {

    if (fs.existsSync(driverDir)) {
      done();
    } else {

      fs.mkdir(driverDir, function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    }
  });

  it('should return driverPath when args is ok', function(done) {

    getWebDriver.run({
      directory: driverDir,
      version: '2.20',
      browser: 'chrome'
    }).then(function(driverPath) {
      console.log('driverPath: %s', driverPath);
      driverPath.should.be.a.String();
      done();
    });

  });

  it('should return driverPath when args is ok(opera)', function(done) {

    getWebDriver.run({
      browser: 'opera',
      directory: driverDir,
      version: '0.2.2'
    }).then(function(driverPath) {
      console.log('driverPath: %s', driverPath);
      driverPath.should.be.a.String();
      done();
    });

  });

  it('should throw error when the version is not existed', function(done) {

    getWebDriver.run({
      browser: 'chrome',
      directory: driverDir,
      version: '100.100'
    }).catch(function(err) {
      err.message.should.match(/not exist/);
      done();
    });

  });


  it('should throw error when the directory is not existed', function(done) {
    getWebDriver.run({
      browser: 'chrome',
      directory: './xxxx',
      version: '2.20'
    }).catch(function(err) {
      err.message.should.match(/directory not exist/);
      done();
    });
  });

});