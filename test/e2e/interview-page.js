var InterviewPage = function() {
  this.name = element(by.model('interview.name'));
  this.email = element(by.model('interview.email'));
  this.phoneArea = element(by.model('phone_parts.area'));
  this.phoneExchange = element(by.model('phone_parts.exchange'));
  this.phoneSubscriber = element(by.model('phone_parts.subscriber'));
  this.birthdate = element(by.model('interview.birthdate'));

  this.riskYesOption = element(by.css('label[for="risk_taker_yes"]'));
  this.riskNoOption = element(by.css('label[for="risk_taker_no"]'));
  this.riskKind = element(by.name('risk_kind'));

  this.sportsYesOption = element(by.css('label[for="sports_yes"]'));
  this.sportsNoOption = element(by.css('label[for="sports_no"]'));

  this.aliveYesOption = element(by.css('label[for="alive_yes"]'));
  this.aliveNoOption = element(by.css('label[for="alive_no"]'));

  this.gridPremiumOption = function(selector) { return element(by.css('label[for="' + selector + '"]')); };

  this.trustOption = element(by.css('option[value="trust"]'));
  this.trustName = element(by.model('interview.trust_name'));

  this.nextButton = element(by.name('next'));
  this.jumbotronHeading = element(by.css('.jumbotron h1'));
};

module.exports = new InterviewPage();
