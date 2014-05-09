var baseUrl = 'http://localhost:8000';

exports.config = {

  capabilities: {
    'browserName': 'chrome'
  },

  suites: {
    cases: '../test/e2e/scenarios/cases.js',
    interview: '../test/e2e/scenarios/interview.js',
    home: '../test/e2e/scenarios/home.js'
  },

  // Options to be passed to Jasmine-node.
  // https://github.com/angular/protractor/blob/master/referenceConf.js
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  },

  baseUrl: baseUrl,

  // This can be changed via the command line as:
  // --params.login.user 'ngrocks'
  params: {
    login: {
      user: 'admin',
      password: 'doit'
    }
  },

  onPrepare: function() {
    browser.driver.manage().window().setSize(998, 800);

    browser.driver.get(baseUrl + '/#/login');
    // can't access browser.params here ;(
    browser.driver.findElement(by.name('username')).sendKeys('admin');
    browser.driver.findElement(by.name('password')).sendKeys('doit');
    browser.driver.findElement(by.id('login-button')).click();
  }
};
