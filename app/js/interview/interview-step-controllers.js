angular.module('rdx.interview')

.controller('InterviewStep1Controller', ['$scope', function($scope) {

  $scope.phone_parts = {};

  $scope.phoneNumberParts = function() {
    $scope.phone_number = ($scope.phone_parts.area || '') + ($scope.phone_parts.exchange || '') + ($scope.phone_parts.subscriber || '');
    return $scope.phone_number.length > 0 && $scope.phone_number.length != 10;
  };
}])

.controller('InterviewStep2Controller', ['$scope', function($scope) {

  $scope.types = [
    {name: 'Person', value: 'person'},
    {name: 'Trust', value: 'trust'}
  ];

  angular.forEach($scope.types, function(type) {
    if ($scope.interview.beneficiary_type == type.value) {
      $scope.interview.beneficiary_type = type;
    }
  });
}])

.controller('InterviewStep4Controller', ['$scope', 'Quotes', function($scope, Quotes) {

  $scope.finish = function(isValid) {
    if ($scope.interview.alive == 'No') {
      $scope.save(isValid, 'nothanks');
    }
    else {
      $scope.save(isValid, 'thankyou');
    }
  };

  Quotes.getQuotes().then(function(quotes) {
    $scope.quotes = quotes;
  });

  $scope.activate = function(premium) {
    $scope.interview.selectedPremium = premium;
    console.log('activate: ' + angular.toJson(premium));
  };

  $scope.isActive = function(premium) {
    console.log('isActive: ' + angular.toJson(premium));
    return angular.isDefined($scope.interview.selectedPremium) && ($scope.interview.selectedPremium == premium);
  }

  $scope.$watch('interview.selectedPremium', function(newPremium, oldPremium) {
    if (angular.isDefined(newPremium)) {
      angular.forEach($scope.quotes, function(quote) {
        angular.forEach(quote.premiums.monthly, function(premium) {
          if (premium == newPremium) {
            $scope.interview.selectedQuote = quote;
            console.log("new selectedQuote: " + angular.toJson(quote));
          }
        });
      });
    }
  });

  $scope.$watch('interview.selectedQuote', function(newQuote, oldQuote) {
    if (angular.isDefined(newQuote) && angular.isDefined($scope.interview.selectedPremium)) {
      angular.forEach($scope.quotes, function(quote) {
        if (quote == newQuote) {
          angular.forEach(quote.premiums.monthly, function(premium) {
            if ($scope.interview.selectedPremium.term == premium.term) {
              $scope.interview.selectedPremium = premium;
              console.log("new selectedPremium: " + angular.toJson(premium));
            }
          });
        };
      });
    }
  });
}]);
