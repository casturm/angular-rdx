module.exports = function(config) {
  config.set({

    basePath: '../',
    autoWatch : true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false,

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/js/**/*.js',
      'test/**/*.js'
    ],

    exclude: [
      'test/e2e/**'
    ],

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
