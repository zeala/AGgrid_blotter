const path = require('path');
const webpack = require('../config/webpack.config.test.js');

module.exports = function(config) {
  config.set({
    basePath: '../..',
    browsers: ['CustomChromeHeadless'],
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          // on Windows, headless chrome is not supported before Chrome 60, which is not yet stable, so move the window off the screen
          '--window-position=-9999,0'
        ]
      }
    },
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'build/test/tests.webpack.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'build/test/tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'junit'],
    singleRun: true,
    autoWatch: true,
    webpack: webpack,
    webpackServer: {
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    junitReporter: {
      outputFile: path.join(__dirname, '..', '..', 'test-results.xml')
    }
  });
};
