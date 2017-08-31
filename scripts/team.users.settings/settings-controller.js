"use strict";

angular.module('shippersPortalApp.team.users.settings.control', [])
.controller('UserSettings', function($scope, $stateParams, $filter, $state, usersService, $q) {

  $scope.init = function() {
    $scope.editUser = angular.copy($scope.user);
  }

  $scope.suspendUser = function() {
    var defer = $q.defer();
    var user = $scope.editUser;

    usersService.patchUser({inactive: true}, user.id)
    .then(function(response) {
      $scope.$parent.$parent.$parent.user = response.data;
      $state.go("^.^");
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }

  $scope.enableUser = function() {
    var defer = $q.defer();
    var user = $scope.editUser;

    usersService.patchUser({inactive: false}, user.id)
    .then(function(response) {
      $scope.$parent.$parent.$parent.user = response.data;
      $state.go("^.^");
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }
  
})