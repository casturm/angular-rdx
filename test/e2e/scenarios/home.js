describe('Home Page', function() {
  var homePage = require('../home-page.js');

  beforeEach(function() {
    browser.get('#/');
  });

  it('should navigate to the interview page when the DOIT! button is clicked', function() {
    homePage.doitButton.click();
    expect(browser.getCurrentUrl()).toContain('#/interview');
  });
});

