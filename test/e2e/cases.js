describe('AngularRDX', function() {

  var ptor;
  beforeEach(function() {
//    browser.get('/');
    ptor = protractor.getInstance();

    element(by.css('.navbar ul li')).click().then(function() {
      expect(ptor.isElementPresent(by.css('.page-header'))).toBe(true);
    });
  });

  describe('cases page', function() {
    var name, email;

    beforeEach(function() {
      var nameElement = element(by.id('cases-content')).findElement(by.repeater('c in cases').row(0).column('c.name'));
      var emailElement = element(by.id('cases-content')).findElement(by.repeater('c in cases').row(0).column('c.email'));
      name = nameElement.getText();
      email = emailElement.getText();
      nameElement.click();
    });

    it('should display the detail when the name is clicked on', function () {
      element(by.id('case-detail')).findElements(by.binding('case.name')).then(function(names) {
        expect(names[0].getText()).toEqual(name);
        expect(names[1].getText()).toEqual(name);
      });
    });

    it('should display the name item edit view when I click on the name item ', function() {
      element(by.id('case-detail')).findElements(by.binding('case.name')).then(function(names) {
        expect(names[0].getText()).toEqual(name);
        names[1].click();
      });
      element.all(by.binding('item')).then(function(arr) {
        expect(arr[0].getText()).toEqual('name Edit');
        expect(arr[1].getText()).toEqual(name);
      });
    });

    it('should display the email item edit view when I click on the email item ', function() {
      element.all(by.binding('case.email')).then(function(names) {
        names[0].click();
      });
      element.all(by.binding('item')).then(function(arr) {
        expect(arr[0].getText()).toEqual('email Edit');
        expect(arr[1].getText()).toEqual(email);
      });
    });
  })
});

