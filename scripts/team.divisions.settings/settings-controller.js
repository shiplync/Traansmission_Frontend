"use strict";

angular.module('shippersPortalApp.team.divisions.settings')
.controller('Settings', function($scope, $stateParams, $filter, $state, divisionsService, $q) {

  $scope.init = function() {
    $scope.editDivision = angular.copy($scope.division);
  }

  $scope.updateObject = function() {
    var defer = $q.defer();
    var division = $scope.editDivision;

    divisionsService.patchDivision(division, division.id)
    .then(function(response) {
      $scope.$parent.$parent.$parent.division = response.data;
      $state.go("^.^");
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeObject = function(division) {
    var defer = $q.defer();
    divisionsService.deleteDivision(division.id)
    .then(function(response) {
      $state.go("^.^", {id: ''}, {reload: true});
      defer.resolve();
    })
    .catch(function(err) {
      defer.reject();
    })
    return defer.promise;
  }
  
})