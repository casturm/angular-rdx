describe('AngularRDX', function() {

  describe('homepage', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000');
    });

    it('should provide me with a button to DOIT', function() {
      expect(element(by.css('.btn-primary')).isPresent()).toBe(true);
    });

    it('should take me to step1 when I click the DOIT button', function() {
      element(by.css('.btn-primary')).click();
      expect(element(by.model('interview.name')).isPresent()).toBe(true);
    });
  });

  describe('interview', function() {

    it('should walk me through the interview steps and take me to the thankyou page', function() {
      browser.get('http://localhost:8000');

      element(by.css('.btn-primary')).click();

      element(by.model('interview.name')).sendKeys('Jane Doe');
      element(by.css('.btn-primary')).click();

      element(by.css('option[value="trust"]')).click();
      element(by.model('interview.trust_name')).sendKeys('Trusty Trust Fund');
      element(by.css('.btn-primary')).click();

      element(by.name('risk_taker_no')).click();
      element(by.css('.btn-primary')).click();

      element(by.name('alive_yes')).click();
      element(by.css('.btn-primary')).click();

      expect(element(by.css('.jumbotron')).getText()).toEqual('Thank You!\nYour loved ones will thank you too.');
    });

    it('should walk me through the interview steps and take me to the thanksbutnothanks page', function() {
      browser.get('http://localhost:8000');

      element(by.css('.btn-primary')).click();

      element(by.model('interview.name')).sendKeys('Jane Doe');
      element(by.css('.btn-primary')).click();

      element(by.css('option[value="trust"]')).click();
      element(by.model('interview.trust_name')).sendKeys('Trusty Trust Fund');
      element(by.css('.btn-primary')).click();

      element(by.name('risk_taker_no')).click();
      element(by.css('.btn-primary')).click();

      element(by.name('alive_no')).click();
      element(by.css('.btn-primary')).click();

      expect(element(by.css('.jumbotron')).getText()).toEqual('You Are Dead!\nSorry, but we can\'t insure you at this time.');
    });
  });
});
