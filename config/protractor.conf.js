var baseUrl = 'http://localhost:8000';

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  suites: {
    interview: '../test/e2e/interview.js',
    cases: '../test/e2e/cases.js'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },

  baseUrl: baseUrl,

  onPrepare: function() {
    browser.driver.get(baseUrl + '/#/login');

    browser.driver.wait(function() {
      return browser.driver.findElement(by.name('username')).isDisplayed();
    }, 1000);

    browser.driver.findElement(by.name('username')).sendKeys('admin');
    browser.driver.findElement(by.name('password')).sendKeys('doit');
    browser.driver.findElement(by.id('login-button')).click();

    // wait for login to complete
    browser.driver.wait(function() {
      return browser.driver.findElement(by.name('start')).isDisplayed();
    }, 1000);
  }
};
