var util = require('util');

describe('Interview Page', function() {
  var homePage = require('../home-page.js');
  var interviewPage = require('../interview-page.js');

  beforeEach(function() {
    browser.get('#/');
    homePage.doitButton.click();
  });

  it('should walk me through the interview steps and when I enter valid data, take me to the thankyou page', function() {
    interviewPage.name.sendKeys('Jane Doe');
    interviewPage.email.sendKeys('jane@rdx.com');
    interviewPage.phoneArea.sendKeys('303');
    interviewPage.phoneExchange.sendKeys('244');
    interviewPage.phoneSubscriber.sendKeys('9076');
    interviewPage.birthdate.sendKeys('01/21/1974');
    interviewPage.nextButton.click();

    interviewPage.riskYesOption.click();
    interviewPage.riskKind.sendKeys('rock climbing');
    interviewPage.sportsYesOption.click();
    interviewPage.aliveYesOption.click();
    interviewPage.nextButton.click();

    interviewPage.gridPremiumOption('25000_15').click();
    interviewPage.nextButton.click();

    interviewPage.trustOption.click();
    interviewPage.trustName.sendKeys('Trusty Trust Fund');
    interviewPage.nextButton.click();

    //review
    interviewPage.nextButton.click();

    expect(interviewPage.jumbotronHeading.getText()).toEqual('Thank You!');
  });

  it('should walk me through the interview steps and take me to the thanksbutnothanks page', function() {
    interviewPage.name.sendKeys('Jane Doe');
    interviewPage.email.sendKeys('jane@rdx.com');
    interviewPage.phoneArea.sendKeys('303');
    interviewPage.phoneExchange.sendKeys('244');
    interviewPage.phoneSubscriber.sendKeys('9076');
    interviewPage.birthdate.sendKeys('01/21/1974');
    interviewPage.nextButton.click();

    interviewPage.riskYesOption.click();
    interviewPage.riskKind.sendKeys('rock climbing');
    interviewPage.sportsYesOption.click();
    interviewPage.aliveNoOption.click();
    interviewPage.nextButton.click();

    expect(interviewPage.jumbotronHeading.getText()).toEqual('You Are Dead!');
  });
});
