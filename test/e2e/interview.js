describe('AngularRDX', function() {

  var ptor;

  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  describe('home page', function() {
    it('should provide me with a button to DOIT', function() {
      expect(ptor.isElementPresent(by.name('start'))).toBe(true);
    });
  });

  describe('interview steps', function() {

    it('should walk me through the interview steps and take me to the thankyou page', function() {

      element(by.name('start')).click();

      element(by.model('interview.name')).sendKeys('Jane Doe');
      element(by.model('interview.email')).sendKeys('jane@rdx.com');
      element(by.model('phone_parts.area')).sendKeys('303');
      element(by.model('phone_parts.exchange')).sendKeys('244');
      element(by.model('phone_parts.subscriber')).sendKeys('9076');
      element(by.name('next')).click();

      element(by.css('option[value="trust"]')).click();
      element(by.model('interview.trust_name')).sendKeys('Trusty Trust Fund');
      element(by.name('next')).click();

      element(by.name('risk_taker_yes')).click();
      element(by.name('risk_kind')).sendKeys('rock climbing');
      element(by.name('next')).click();

      element(by.name('alive_yes')).click();
      element(by.name('next')).click();

      var text = element(by.css('.jumbotron h1')).getText();
      expect(text).toEqual('Thank You!');
    });

    it('should walk me through the interview steps and take me to the thanksbutnothanks page', function() {

      element(by.name('start')).click();

      element(by.model('interview.name')).sendKeys('Jane Doe');
      element(by.name('next')).click();

      element(by.css('option[value="trust"]')).click();
      element(by.model('interview.trust_name')).sendKeys('Trusty Trust Fund');
      element(by.name('next')).click();

      element(by.name('risk_taker_no')).click();
      element(by.name('next')).click();

      element(by.name('alive_no')).click();
      element(by.name('next')).click();

      var text = element(by.css('.jumbotron h1')).getText();
      expect(text).toEqual('You Are Dead!');
    });
  });
});
