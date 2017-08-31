"use strict";

angular.module('shippersPortalApp.authentication.registeruser',[

  ])
.controller('registerUserInviteController', function($scope, $state, $stateParams, AuthService, $rootScope, $q, authenticationService){

  $scope.init = function() {
    if($stateParams.t) {
      $scope.token = $stateParams.t;
      $scope.setUserinvite($scope.token);
    }
  }

  $scope.setUserinvite = function() {
    authenticationService.getUserinvite($scope.token)
    .then(function(response) {
      $scope.invite = response.data;
    })
    .catch(function (err) {
      $scope.retrieveInviteError = err.data;
    });
  }

  $scope.setPassword = function(password) {
    var defer = $q.defer();
    authenticationService.patchUserinvite($scope.token, {password: password})
    .then(function(response) {
      return AuthService.handleLoginResponse(response);
    })
    .then(function(response) {
      $state.go('useraccount.edit.basic');
      defer.resolve();
    })
    .catch(function (err) {
      $scope.setPasswordError = err.data;
      defer.reject();
    });
    return defer.promise;
  }

  $scope.login = function (credentials) {
    var defer = $q.defer();
    $scope.loginError = '';
    AuthService.login(credentials)
    .then(function(response) {
      $state.go('home');
    })
    .catch(function (err) {
      $scope.loginError = err;
      defer.reject();
    });
    return defer.promise;
  };

})