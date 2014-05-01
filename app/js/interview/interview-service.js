angular.module('rdx.interview')

.factory('Interview', ['$http', function ($http) {
  var current;
  var factory = {};
  factory.current = function() {
    return current;
  };
  factory.create = function() {
    $http.post('api/interview').then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      current = resp.data;
    });
  };
  factory.save = function() {
    var interview = current; //cache.get('current');
    console.log("put current interview: " + angular.toJson(interview));
    return $http.put('api/interview', interview).then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
    });
  };
  return factory;
}]);

