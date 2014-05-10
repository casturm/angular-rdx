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
      getQuotes: function() {}
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

  it('should have a function $scope.activate(p) set interview.selectedPremium = p', function() {
    var expectedPremium = 'selected premium';
    scope.activate(expectedPremium);
    expect(scope.interview.selectedPremium).toEqual(expectedPremium);
  });

  describe('$scope.isActive', function() {
    var expectedPremium = 'selected premium';

    it('should respond false given interview.selectedPremium is undefined', function() {
      expect(scope.isActive(expectedPremium)).toBe(false);
    });

    it('should respond true given interview.selectedPremium == expectedPremium', function() {
      scope.interview.selectedPremium = expectedPremium;
      expect(scope.isActive(expectedPremium)).toBe(true);
    });

    it('should respond false given interview.selectedPremium != expectedPremium', function() {
      scope.interview.selectedPremium = expectedPremium;
      expect(scope.isActive('something else')).toBe(false);
    });
  });

  describe('$scope.$watch on interview.selectedPremium', function() {
    it('should set the selectedQuote when newPremium == quote.premiums.monthly[1] ', function() {
      expect(scope.interview.selectedQuote).toBeUndefined();
      scope.interview.selectedPremium = quotes[0].premiums.monthly[1];

      scope.$digest();
      expect(scope.interview.selectedQuote).toEqual(quotes[0]);
    });
  });

  describe('$scope.$watch on interview.selectedQuote', function() {
    it('should set the selectedPremium when newQuote == quote[1] and seelctedPremium.term == quote[1].premiums.monthly[2].term', function() {
      expect(scope.interview.selectedQuote).toBeUndefined();

      scope.interview.selectedQuote = quotes[1];
      scope.interview.selectedPremium = {term: '20'};

      scope.$digest();

      expect(scope.interview.selectedPremium).toEqual(quotes[1].premiums.monthly[2]);
    });
  });
});
