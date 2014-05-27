describe('rdx.interview.InterviewReviewController', function() {
  beforeEach(module('rdx.interview'));
  beforeEach(module('rdx.quotes'));

  beforeEach(module(function ($provide) {
    Quotes = {
      getQuotes: function() {},
      getQuote: function(premium, quotes) {},
      getPremium: function(quote, term) {}
    };
    $provide.value('Quotes', Quotes);
  }));


  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.interview = {};
    scope.save = function(isValid, nextStep) {}
    $controller('InterviewReviewController', {$scope: scope, Quotes: Quotes});
  }));

  it('should assign finish method', function() {
    expect(scope.finish).toBeDefined();
  });

  it('should call save correctly', function() {
    spyOn(scope, 'save');
    scope.finish(true);
    expect(scope.save).toHaveBeenCalledWith(true, 'thankyou');
  });
});
