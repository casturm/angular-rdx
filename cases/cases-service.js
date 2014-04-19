angular.module('rdx.cases.services', [

])

.factory('cases', ['$http', function ($http) {
  var path = 'assets/cases.json';
  var cases = [];
  var next_id = 2;
  var cases_promise = $http.get(path).then(function (resp) {
    cases = resp.data.cases;
    return cases;
  });

  var factory = {};
  factory.start_interview = function() {
    current_case = {
      id: next_id++
    };
    cases.unshift(current_case);
  };
  factory.current = function() {
    return cases[0];
  };
  factory.save_current = function() {
    console.log("save current case: " + angular.toJson(cases[0]));
  };
  factory.cases = function() {
    return cases;
  };
  factory.all = function () {
    return cases_promise;
  };
  return factory;
}]);

