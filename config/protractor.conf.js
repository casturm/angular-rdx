var baseUrl = 'http://localhost:8000';

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  suites: {
    cases: '../test/e2e/cases.js',
    interview: '../test/e2e/interview.js'
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

    browser.driver.wait(function() {
      return browser.driver.findElement(by.name('username')).isDisplayed();
    }, 1000);

    // can't access params here ;(
    browser.driver.findElement(by.name('username')).sendKeys('admin');
    browser.driver.findElement(by.name('password')).sendKeys('doit');
    browser.driver.findElement(by.id('login-button')).click();

    // wait for login to complete
    browser.driver.wait(function() {
      return browser.driver.findElement(by.name('start')).isDisplayed();
    }, 1000);
  }
};
