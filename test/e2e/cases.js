describe('AngularRDX', function() {

  var ptor;

  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  describe('cases page', function() {

    beforeEach(function() {
      element(by.css('.navbar ul li')).click();
      browser.sleep(500);
      element(by.model('user.username')).sendKeys('admin');
      element(by.model('user.password')).sendKeys('doit');
      element(by.id('login-button')).click();
    });

    it('should provide me with a list of cases', function() {
      expect(ptor.isElementPresent(by.css('.page-header'))).toBe(true);
      var elems = element(by.repeater('c in cases').column('{{c.name}}'));
      expect(elems.getText()).toEqual('bob');
    });
  });
});

