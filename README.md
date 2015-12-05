# getWebDriver [![Build Status](https://travis-ci.org/imsobear/getWebDriver.svg?branch=master)](https://travis-ci.org/imsobear/getWebDriver) [![Coverage Status](https://coveralls.io/repos/imsobear/getWebDriver/badge.svg?branch=master)](https://coveralls.io/r/imsobear/getWebDriver?branch=master)

> download and unpacker webDriver from cnpm mirros

## Install

```bash
npm install --save get-webdriver
```

## Usage

```javascript
var getWebDriver = require('get-webdriver');

getWebDriver.run({
      directory: './drivers',
      version: '2.20',
      browser: 'chrome'
    }).then(function(driverPath) {
      console.log('driverPath: %s', driverPath);
    });
```

## API

### .run(options)

download and unpacker webDriver.

#### options

- Type: object

#### options.browser

- Type: String
- Values: chrome, opera

#### options.platform

- Type: String
- Values: linux, darwin, win32
- Default: `process.platform`

#### options.directory

- Type: String

The directory for save drivers

#### options.versions

- Type: String

The webDriver version, refer to [chromeDriver versions](http://npm.taobao.org/mirrors/chromedriver/), [operaDriver versions](http://npm.taobao.org/mirrors/operadriver/)

## Test

```bash
npm test
```

## License

MIT &copy; 2015 sobear
