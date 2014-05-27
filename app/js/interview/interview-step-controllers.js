angular.module('rdx.interview')

.controller('InterviewAboutYouController', ['$scope', function($scope) {

  $scope.phone_parts = {};

  $scope.phoneNumberParts = function() {
    $scope.phone_number = ($scope.phone_parts.area || '') + ($scope.phone_parts.exchange || '') + ($scope.phone_parts.subscriber || '');
    return $scope.phone_number.length > 0 && $scope.phone_number.length != 10;
  };

  $scope.saveAboutYou = function(isValid) {
    if (angular.isDefined($scope.phone_number) && $scope.phone_number.length == 10) {
      $scope.interview.phone_number = $scope.phone_number;
    }
    $scope.save(isValid, 'interview.lifestyle');
  };

  $scope.datepickerPopupConfig = {
    showWeeks: false
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
}])

.controller('InterviewBeneController', ['$scope', function($scope) {

  $scope.saveBene = function(isValid) {
    $scope.save(isValid, 'interview.review');
  }

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

.controller('InterviewLifestyleController', ['$scope', function($scope) {

  $scope.saveLifestyle = function(isValid) {
    if ($scope.interview.alive == 'No') {
      $scope.save(isValid, 'nothanks');
    }
    else if (angular.isDefined($scope.interview.alive) &&
        angular.isDefined($scope.interview.sports) &&
        angular.isDefined($scope.interview.risk_taker)) {
      $scope.save(isValid, 'interview.quote');
    }
    else {
      console.log(angular.isDefined($scope.interview.alive) + ' ' + angular.isDefined($scope.interview.sports) + ' ' +  angular.isDefined($scope.interview.risk_taker))
      $scope.save(false, 'none');
    }
  };

  $scope.clickRadio = function(model, value) {
    model = value;
  };
}])

.controller('InterviewReviewController', ['$scope', 'Quotes', function($scope, Quotes) {
  $scope.finish = function(isValid) {
    $scope.save(isValid, 'thankyou');
  };
  // when the selectedQuote changes, set the new selectedPremium
  // so angular will find the right term options and sync the display properly
  $scope.$watch('interview.selectedQuote', function(newQuote, oldQuote) {
    if (angular.isDefined($scope.interview.selectedPremium)) {
      $scope.interview.selectedPremium = Quotes.getPremium(newQuote, $scope.interview.selectedPremium.term)
    }
  });
}])

.controller('InterviewQuoteController', ['$scope', 'Quotes', function($scope, Quotes) {

  $scope.saveQuote = function(isValid) {
    $scope.save(isValid, 'interview.bene');
  };

  if (angular.isUndefined($scope.interview.quotes)) {
    Quotes.getQuotes().then(function(quotes) {
      $scope.interview.quotes = quotes;
    });
  }

  // when the selected premium changes, set the selectedQuote
  // so angular will display the amount options
  $scope.$watch('interview.selectedPremium', function(newPremium, oldPremium) {
    $scope.interview.selectedQuote = Quotes.getQuote(newPremium, $scope.interview.quotes)
  });
  // when the selectedQuote changes, set the new selectedPremium
  // so angular will find the right term options and sync the display properly
  $scope.$watch('interview.selectedQuote', function(newQuote, oldQuote) {
    if (angular.isDefined($scope.interview.selectedPremium)) {
      $scope.interview.selectedPremium = Quotes.getPremium(newQuote, $scope.interview.selectedPremium.term)
    }
  });
}]);
