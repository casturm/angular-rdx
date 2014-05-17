angular.module('rdx.quotes')

.factory('Quotes', ['$http', 'Interview', function ($http, Interview) {
  var factory = {};
  factory.getQuotes = function () {
    console.log('get quotes');
    return $http.get('api/quotes/' + Interview.current().id).then(function(resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return resp.data;
    });
  };
  factory.getQuote = function(newPremium, quotes) {
    var selectedQuote;
    if (angular.isDefined(newPremium)) {
      angular.forEach(quotes, function(quote) {
        angular.forEach(quote.premiums.monthly, function(premium) {
          if (premium == newPremium) {
            selectedQuote = quote;
            console.log("new selectedQuote: " + angular.toJson(selectedQuote));
          }
        });
      }, selectedQuote);
    }
    return selectedQuote
  }
  return factory;
}]);

