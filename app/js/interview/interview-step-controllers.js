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

.controller('InterviewStep4Controller', ['$scope', function($scope) {

  $scope.finish = function(isValid) {
    if ($scope.interview.alive == 'No') {
      $scope.save(isValid, 'nothanks');
    }
    else {
      $scope.save(isValid, 'thankyou');
    }
  };

  $scope.quotes =
  [
    {
      coverageAmount: "25000",
      premiums: {
        monthly: [
          {id: "25000_10", term: "10", amount: "24.49"},
          {id: "25000_15", term: "15", amount: "28.30"},
          {id: "25000_20", term: "20", amount: "37.95"}
        ],
      }
    },
    {
      coverageAmount: "50000",
      premiums: {
        monthly: [
          {id: "50000_10", term: "10", amount: "41.59"},
          {id: "50000_15", term: "15", amount: "49.20"},
          {id: "50000_20", term: "20", amount: "68.51"}
        ],
      }
    },
    {
      coverageAmount: "75000",
      premiums: {
        monthly: [
          {id: "75000_10", term: "10", amount: "58.68"},
          {id: "75000_15", term: "15", amount: "70.10"},
          {id: "75000_20", term: "20", amount: "99.07"}
        ],
      }
    },
    {
      coverageAmount: "100000",
      premiums: {
        monthly: [
          {id: "100000_10", term: "10", amount: "71.25"},
          {id: "100000_15", term: "15", amount: "89.61"},
          {id: "100000_20", term: "20", amount: "128.41"}
        ],
      }
    },
    {
      coverageAmount: "125000",
      premiums: {
        monthly: [
          {id: "125000_10", term: "10", amount: "87.22"},
          {id: "125000_15", term: "15", amount: "110.16"},
          {id: "125000_20", term: "20", amount: "158.67"}
        ],
      }
    },
    {
      coverageAmount: "150000",
      premiums: {
        monthly: [
          {id: "150000_10", term: "10", amount: "103.18"},
          {id: "150000_15", term: "15", amount: "130.72"},
          {id: "150000_20", term: "20", amount: "188.92"}
        ],
      }
    },
    {
      coverageAmount: "175000",
      premiums: {
        monthly: [
          {id: "175000_10", term: "10", amount: "119.15"},
          {id: "175000_15", term: "15", amount: "151.27"},
          {id: "175000_20", term: "20", amount: "219.17"}
        ],
      }
    },
    {
      coverageAmount: "200000",
      premiums: {
        monthly: [
          {id: "200000_10", term: "10", amount: "135.11"},
          {id: "200000_15", term: "15", amount: "171.82"},
          {id: "200000_20", term: "20", amount: "249.43"}
        ],
      }
    },
    {
      coverageAmount: "225000",
      premiums: {
        monthly: [
          {id: "225000_10", term: "10", amount: "151.08"},
          {id: "225000_15", term: "15", amount: "192.38"},
          {id: "225000_20", term: "20", amount: "279.68"}
        ],
      }
    },
    {
      coverageAmount: "250000",
      premiums: {
        monthly: [
          {id: "250000_10", term: "10", amount: "167.04"},
          {id: "250000_15", term: "15", amount: "212.93"},
          {id: "250000_20", term: "20", amount: "309.94"}
        ]
      }
    }];

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
      if (angular.isDefined(newQuote)) {
        angular.forEach($scope.quotes, function(quote) {
          if (quote == newQuote) {
            angular.forEach(quote.premiums.monthly, function(premium) {
              if (angular.isDefined($scope.interview.selectedPremium) && $scope.interview.selectedPremium.term == premium.term) {
                $scope.interview.selectedPremium = premium;
                console.log("new selectedPremium: " + angular.toJson(premium));
              }
            });
          };
        });
      }
    });
}]);
