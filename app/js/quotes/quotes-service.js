angular.module('rdx.quotes')

.factory('Quotes', ['$http', function ($http) {
  var factory = {};
  factory.getQuotes = function () {
    console.log('get quotes');
    return $http.get('quotes/quotes.json').then(function(resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return resp.data;
    });
  };
  return factory;
}]);

