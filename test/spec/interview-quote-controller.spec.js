describe('rdx.interview.InterviewQuoteController', function() {
  var scope;
  var quotes = [{
      coverageAmount: "25000",
      premiums: {
        monthly: [
          {id: "25000_10", term: "10", amount: "24.49"},
          {id: "25000_15", term: "15", amount: "28.30"},
          {id: "25000_20", term: "20", amount: "37.95"}
        ]
      }
    },
    {
      coverageAmount: "50000",
      premiums: {
        monthly: [
          {id: "50000_10", term: "10", amount: "25.63"},
          {id: "50000_15", term: "15", amount: "29.51"},
          {id: "50000_20", term: "20", amount: "39.87"}
        ]
      }
    }
  ];

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

  beforeEach(inject(function($rootScope, $q, $controller) {
    var deferred = $q.defer();
    scope = $rootScope.$new();
    scope.interview = {};
    scope.save = function(isValid) {};

    deferred.resolve(quotes);
    spyOn(Quotes, 'getQuotes').andReturn(deferred.promise);
    $controller('InterviewQuoteController', {$scope: scope, Quotes: Quotes});
  }));

  it('should assign saveQuote function', function() {
    expect(scope.saveQuote).toBeDefined();
  });

  it('should call save correctly', function() {
    spyOn(scope, 'save');
    scope.saveQuote(true);
    expect(scope.save).toHaveBeenCalledWith(true, 'interview.bene');
  });

  describe('$scope.$watch on interview.selectedPremium', function() {
    it('should set the selectedQuote when newPremium == quote.premiums.monthly[1] ', function() {
      expect(scope.interview.selectedQuote).toBeUndefined();

      spyOn(Quotes, 'getQuote').andReturn(quotes[0]);
      scope.interview.selectedPremium = quotes[0].premiums.monthly[1];

      scope.$digest();
      expect(scope.interview.selectedQuote).toEqual(quotes[0]);
    });
  });
});
