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
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'app/js/app.js',
      'app/js/auth/*.js',
      'app/js/cases/*.js',
      'app/js/home/*.js',
      'app/js/interview/*.js',
      'app/js/quotes/*.js',
      'app/js/users/*.js',
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
