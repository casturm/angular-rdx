describe('AngularRDX', function() {

  var ptor;
  beforeEach(function() {
    ptor = protractor.getInstance();
  });

  describe('cases page', function() {
    beforeEach(function() {
      element(by.css('.navbar ul li')).click().then(function() {
        expect(ptor.isElementPresent(by.css('.page-header'))).toBe(true);
      });
    });

    it('should display the list of cases when I click the Cases menu item', function() {
      expect(element(by.repeater('c in cases').row(0).column('c.name')).getText()).toEqual('bob');
    });

    describe('case detail', function() {
      beforeEach(function() {
        element(by.repeater('c in cases').row(0).column('c.name')).click();
      });

      it('should display the detail when the name is clicked on', function () {
        element.all(by.binding('case.name')).then(function(arr) {
          expect(arr[0].getText()).toEqual('bob');
          expect(arr[1].getText()).toEqual('bob');
        });
      });

      it('should display the name item edit view when I click on the name item ', function() {
        element.all(by.binding('case.name')).then(function(names) {
          names[2].click();
        });
        element.all(by.binding('item')).then(function(arr) {
          expect(arr[0].getText()).toEqual('name Edit');
          expect(arr[1].getText()).toEqual('bob');
        });
      });

      it('should display the email item edit view when I click on the email item ', function() {
        element.all(by.binding('case.email')).then(function(names) {
          names[0].click();
        });
        element.all(by.binding('item')).then(function(arr) {
          expect(arr[0].getText()).toEqual('email Edit');
          expect(arr[1].getText()).toEqual('bob@foobar.com');
        });
      });
    })
  });
});

