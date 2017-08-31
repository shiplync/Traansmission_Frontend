'use strict';

angular.module('shippersPortalApp.authentication.register.company.control', [
  ])
.controller('registerCompanyController', function ($scope, $state, $rootScope, registerService, STATELIST, $q, CompanyType, activeCompany, AuthService, analytics) {
  $scope.init = function() {
    $scope.step1Status = 'complete';
    $scope.step2Status = 'active';

    $scope.stateList = STATELIST;
    $scope.companyType = CompanyType;
    $scope.company = activeCompany.data;
  }

  $scope.pacthCompany = function () {
    var defer = $q.defer();
    var data = $scope.company;
    data.registration_complete = true;

    registerService.patchCompany(data)
    .then(function(response) {
      return AuthService.init();
    })
    .then(function(response) {
      $rootScope.accessBlock = null;
      analytics.setUser($rootScope.currentUser);
      analytics.track('finished registration', {});
      $state.go('users');
      defer.resolve();
    })
    .catch(function(err) {
      $scope.registerError = err.data.error;
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  };
});
