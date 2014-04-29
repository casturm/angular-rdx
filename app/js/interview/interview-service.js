angular.module('rdx.interview')

.factory('Interview', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
  var cache = $cacheFactory('interview');
  var factory = {};
  factory.current = function() {
    return cache.get('current');
  };
  factory.create = function() {
    $http.post('api/interview').then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      cache.put('current', resp.data);
    });
  };
  factory.save = function() {
    var interview = cache.get('current');
    console.log("put current interview: " + angular.toJson(interview));
    return $http.put('api/interview', interview).then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return cache.get('interview');
    });
  };
  return factory;
}]);

