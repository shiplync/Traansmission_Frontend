'use strict';

angular.module('shippersPortalApp.authentication.register.user.control', [
	])
.controller('registerUserController', function ($scope, $state, $location, $rootScope, registerService, CompanyType, AuthService, $q, analytics) {
  $scope.init = function() {
    $scope.step1Status = 'active';
    $scope.step2Status = 'disabled';
    
    $scope.data = {
      company: {

      }
    }

    analytics.trackPageView();
    analytics.track('enter registration page', {});

    // Track where user came from
    var params = $location.search();
    $rootScope.initialRegistrationData = {
      'utm_source': params.utm_source,
      'utm_medium': params.utm_medium,
      'utm_campaign': params.utm_campaign
    };
  }
  $scope.register = function (isValid) {
    var defer = $q.defer();
    var data = $scope.data;
    if(!isValid) {
      defer.reject();
      return defer.promise;
    }
    //Default company data
    data.generic_user.phone = null;
    data.company = {
      company_type: CompanyType.carrier.value
    }

    registerService.register($scope.data)
    .then(function(response) {
      return AuthService.handleLoginResponse(response)
    })
    .then(function(response) {
      defer.resolve()
      //$state.go('registersubscription');
      analytics.track('completed registration step 1', {});
      $state.go('registercompany');
    })
    .catch(function(err) {
      $scope.registerError = err.data.error;
      defer.reject();
    })
    return defer.promise;
  };

});
