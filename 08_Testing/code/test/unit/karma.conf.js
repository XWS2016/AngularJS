(function() {
  'use strict';

  var buildReportsPath = '../../buildreports/';

  module.exports = function(karma) {
    karma.set({

      basePath: '',

      files: [
        '../../node_modules/chai/chai.js',
        '../../node_modules/sinon/pkg/sinon.js',
        '../../node_modules/sinon-chai/lib/sinon-chai.js',

        // bower:js
        '../../bower_components/angular/angular.js',
        '../../bower_components/angular-resource/angular-resource.js',
        '../../bower_components/lodash/lodash.js',
        '../../bower_components/restangular/dist/restangular.js',
        '../../bower_components/angular-ui-router/release/angular-ui-router.js',
        '../../bower_components/ngstorage/ngStorage.js',
        '../../bower_components/angular-jwt/dist/angular-jwt.js',
        '../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        '../../bower_components/jquery/dist/jquery.js',
        '../../bower_components/bootstrap/dist/js/bootstrap.js',
        '../../bower_components/angular-mocks/angular-mocks.js',
        // endbower

        '../../dist/client/templates.js',
        '../../client/**/!(*.spec).js',
        '../../test/unit/**/*.spec.js',
      ],

      preprocessors: {
        '../../client/**/!(*.spec).js': 'coverage'
      },

      coverageReporter: {
        dir : buildReportsPath + 'coverage/',
        includeAllSources: true,
        reporters: [
          {type: 'html'},
          {type: 'text-summary'},
        ],
        watermarks: {
          statements: [75, 90],
          functions: [75, 90],
          branches: [75, 90],
          lines: [75, 90],
        },
      },

      htmlReporter: {
        outputFile: buildReportsPath + 'unit_tests/index.html'
      },

      junitReporter: {
        outputFile: '../' + buildReportsPath + 'unit_tests/test-results.xml',
        suite: ''
      },

      autoWatch: false,

      frameworks: ['mocha'],

      port: 9876,
      runnerPort: 9100,

      colors: true,

      logLevel: karma.LOG_INFO,

      browsers: ['PhantomJS'],

      plugins: [
        'karma-mocha',
        'karma-phantomjs-launcher',
        'karma-coverage',
        'karma-htmlfile-reporter',
        'karma-junit-reporter'
      ],

      reporters: ['progress', 'coverage', 'html', 'junit'],

      client: {
        captureConsole: true
      }
    });
  };
})();
