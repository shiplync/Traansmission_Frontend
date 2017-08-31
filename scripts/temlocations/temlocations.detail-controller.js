"use strict";

angular.module('shippersPortalApp.temlocations')
.controller('temlocationsDetailController', function($scope, $stateParams, $state, $q, temlocationsService){
  $scope.init = function() {
    $scope.editLocation = angular.copy($scope.location);
  }

  $scope.update = function() {
    var defer = $q.defer();
    var location = $scope.editLocation;

    temlocationsService.patchLocation(location, location.id)
    .then(function(response) {
      $scope.$parent.$parent.$parent.location = response.data;
      $state.go("^.^");
      defer.resolve();
    })
    .catch(function(err) {
      $scope.fieldErrors = err.data;
      defer.reject();
    })
    return defer.promise;
  }

  $scope.removeLocation = function(location) {
    // Typically called in 'shipments.location.edit' state
    var defer = $q.defer();
    temlocationsService.deleteLocation(location.id)
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