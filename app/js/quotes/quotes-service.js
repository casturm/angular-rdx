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
  return factory;
}]);

