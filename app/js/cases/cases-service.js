angular.module('rdx.cases')

.factory('Cases', ['$http', function ($http) {
  var factory = {};
  factory.all = function () {
    console.log('get casess');
    return $http.get('api/cases').then(function(resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return resp.data.cases;
    });
  };
  factory.findById = function(cases, id) {
    found_case = [];
    angular.forEach(cases, function(c) {
      if (c.id == id) {
        found_case.push(c);
      }
    }, found_case);
    return found_case[0];
  };
  return factory;
}]);

