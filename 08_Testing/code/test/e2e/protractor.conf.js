exports.config = {
    seleniumServerJar: '../../node_modules/grunt-protractor-runner/node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
    chromeDriver: '../../node_modules/grunt-protractor-runner/node_modules/protractor/selenium/chromedriver_2.21',
    specs: [
      './specs/login.spec.js',
      './specs/main.spec.js'
    ],
    framework: 'mocha',
    capabilities: {
      browserName: 'chrome',
    },
    allScriptsTimeout: 360000,
    rootElement: '[ng-app]',
    baseUrl: 'http://localhost:8080',
    mochaOpts: {
      ui: 'bdd',
      reporter: 'spec'
    },
    onPrepare: function() {
      browser.manage().window().setSize(1280, 800);
      global.chai = require('chai');
      global.should = chai.should();
      
      var chaiAsPromised = require('chai-as-promised');
      global.chai.use(chaiAsPromised);
    }
}