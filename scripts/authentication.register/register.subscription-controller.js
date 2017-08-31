'use strict';

angular.module('shippersPortalApp.authentication.register.subscription.control', [
  ])
.controller('registerSubscriptionController', function ($scope, $state, $stateParams, registerService,  $q, activeSubscription) {
  $scope.init = function() {
    $scope.step1Status = 'complete';
    $scope.step2Status = 'active';
    $scope.step3Status = 'disabled';

    var driverMin = 0;
    var driverMax = 50;
    var userMin = 0;
    var userMax = 50;

    $scope.userCost = 37.5;
    $scope.driverCost = 6.25;
    
    var driverParam = parseInt($stateParams.drivers);
    var userParam = parseInt($stateParams.users);
    var driverValue = ((driverParam !==NaN && driverParam <= driverMax && driverParam >= driverMin) ? driverParam : activeSubscription.data.no_trucks)
    var userValue = ((userParam !==NaN && userParam <= userMax && userParam >= userMin) ? userParam : activeSubscription.data.no_users)

    if($stateParams.plantype == 'annual' || $stateParams.plantype == 'monthly') {
      $scope.planType = $stateParams.plantype;
    } else {
      $scope.planType = activeSubscription.data.annual_plan ? 'annual' : 'monthly';
    }

    $scope.driverSlider = {
      min: driverMin,
      max: driverMax,
      step: 1,
      value: driverValue
    }
    
    $scope.userSlider = {
      min: userMin,
      max: userMax,
      step: 1,
      value: userValue
    }
    
    $scope.setCost();
  }

  $scope.setCost = function() {
    var annualDiscountFactor = ($scope.planType==='annual' ? 0.8 : 1.0);
    $scope.monthlyCost = Math.ceil(($scope.userSlider.value * $scope.userCost + $scope.driverSlider.value * $scope.driverCost) * annualDiscountFactor);
    $scope.annualCost = $scope.monthlyCost * 12;
  }

  $scope.patchSubscription = function () {
    // $state.go('registercompany');
    var defer = $q.defer();
    var data = {
      no_users: $scope.userSlider.value,
      no_trucks: $scope.driverSlider.value,
      annual_plan: ($scope.planType==='annual'),
    }
    registerService.patchSubscription(data)
    .then(function(response) {
      $state.go('register.company');
    })
    .catch(function(err) {
      $scope.registerError = err.data;
      defer.reject();
    })
    return defer.promise;
  };

});
