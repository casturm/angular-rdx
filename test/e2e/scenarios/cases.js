describe('Cases page', function() {
  var nameElement, emailElement;

  beforeEach(function() {
    element(by.css('.navbar ul li')).click().then(function() {
      expect(browser.isElementPresent(by.css('.page-header'))).toBe(true);
    });
    nameElement = element(by.id('cases-content')).findElements(by.repeater('c in cases').row(0).column('c.name'));
    emailElement = element(by.id('cases-content')).findElements(by.repeater('c in cases').row(0).column('c.email'));
  });

  it('should display a list of cases', function() {
    var caseList = element(by.id('cases-content')).findElements(by.repeater('c in cases').row(0));
    caseList.then(function(arr) {
      expect(arr.length).toEqual(1);
    });
  });

  describe('click on first name in the list', function() {
    beforeEach(function() {
      nameElement.then(function(elem) {
        elem[0].click();
      });
    });

    it('should display the name in the detail view', function () {
      element(by.id('cases-content')).findElements(by.binding('case.name')).then(function(names) {
        expect(names[0].getText()).toEqual('bob');
        expect(names[1].getText()).toEqual('bob');
      });
    });

    it('should display the name item edit view when I click on the name item ', function() {
      element(by.id('case-detail')).findElements(by.binding('case.name')).then(function(names) {
        expect(names[0].getText()).toEqual('bob');
        names[1].click();
      });
      element.all(by.binding('item')).then(function(arr) {
        expect(arr[0].getText()).toEqual('name Edit');
        expect(arr[1].getText()).toEqual('bob');
      });
    });

    it('should display the email item edit view when I click on the email item ', function() {
      element.all(by.binding('case.email')).then(function(email) {
        email[0].click();
      });
      element.all(by.binding('item')).then(function(arr) {
        expect(arr[0].getText()).toEqual('email Edit');
        expect(arr[1].getText()).toEqual('bob@foobar.com');
      });
    });
  });
});
